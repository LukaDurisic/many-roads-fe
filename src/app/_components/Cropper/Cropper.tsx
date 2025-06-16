"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import imageCompression from "browser-image-compression";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import styles from "./Cropper.module.css";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const formSchema = z.object({
  cover_image: z
    .custom<File>()
    .refine((file) => file instanceof File, "Please upload a file")
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 10MB.`)
    .refine(
      (file) => ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
      "Only .jpg, .jpeg, and .png formats are supported."
    ),
});

export default function ImageUploader() {
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [compressedPreview, setCompressedPreview] = useState<string | null>(
    null
  );
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [targetWidth, setTargetWidth] = useState(600);
  const [targetHeight, setTargetHeight] = useState(400);
  const [showCrop, setShowCrop] = useState(false);
  const [crop, setCrop] = useState<Crop>({
    unit: "px",
    width: targetWidth,
    height: targetHeight,
    x: 0,
    y: 0,
  });
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cover_image: undefined,
    },
  });

  // Set crop to center of image
  useEffect(() => {
    if (imgRef.current) {
      const { width, height } = imgRef.current;
      setCrop({
        unit: "px",
        width: targetWidth,
        height: targetHeight,
        x: (width - targetWidth) / 2,
        y: (height - targetHeight) / 2,
      });
    }
  }, [targetWidth, targetHeight, originalPreview]);
  const cropImage = useCallback(
    (image: HTMLImageElement, crop: Crop, fileName: string): Promise<File> => {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );
      }

      return new Promise((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Canvas is empty"));
              return;
            }
            resolve(new File([blob], fileName, { type: "image/jpeg" }));
          },
          "image/jpeg",
          1
        );
      });
    },
    []
  );

  const resizeImage = useCallback(
    (file: File, width: number, height: number): Promise<Blob> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = document.createElement("img");
          img.onload = () => {
            const canvas = canvasRef.current!;
            const ctx = canvas.getContext("2d")!;

            const imageAspectRatio = img.width / img.height;
            const targetAspectRatio = width / height;

            let drawWidth = width;
            let drawHeight = height;
            let offsetX = 0;
            let offsetY = 0;

            if (imageAspectRatio > targetAspectRatio) {
              drawHeight = width / imageAspectRatio;
              offsetY = (height - drawHeight) / 2;
            } else {
              drawWidth = height * imageAspectRatio;
              offsetX = (width - drawWidth) / 2;
            }

            canvas.width = width;
            canvas.height = height;

            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

            canvas.toBlob(
              (blob) => {
                resolve(blob!);
              },
              "image/jpeg",
              0.9
            );
          };
          img.onerror = reject;
          img.src = e.target?.result as string;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    },
    []
  );

  const processImage = useCallback(
    async (file: File) => {
      if (!completedCrop || !imgRef.current) return;
      // const SMALL_IMAGE_THRESHOLD = 30 * 1024;
      // Note: Uncomment this to optionally skip the compression step for smaller images i.e recommended les than 30kb
      // Step 1: Check if the image is small and skip compression if it is
      // if (file.size < SMALL_IMAGE_THRESHOLD) {
      //   const reader = new FileReader();
      //   reader.onload = () => {
      //     setCompressedPreview(reader.result as string);
      //     setCompressedSize(file.size);
      //   };
      //   reader.readAsDataURL(file);

      //   form.setValue('cover_image', file);
      //   form.clearErrors('cover_image');
      //   setShowCrop(false);
      //   return;
      // }

      try {
        // Step 2: Crop the image
        const croppedFile = await cropImage(
          imgRef.current,
          completedCrop,
          file.name
        );

        // Step 3: Compress the cropped image
        const options = {
          maxSizeMB: 5,
          maxWidthOrHeight: Math.max(targetWidth, targetHeight),
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(croppedFile, options);

        // Step 4: Resize the compressed image
        const resizedBlob = await resizeImage(
          compressedFile,
          targetWidth,
          targetHeight
        );
        const resizedFile = new File([resizedBlob], file.name, {
          type: "image/jpeg",
        });

        // Update state and form
        const reader = new FileReader();
        reader.onload = () => {
          setCompressedPreview(reader.result as string);
          setCompressedSize(resizedFile.size);
        };
        reader.readAsDataURL(resizedFile);

        form.setValue("cover_image", resizedFile);
        form.clearErrors("cover_image");
        setShowCrop(false);
      } catch (error) {
        console.error("Error processing image:", error);
        setCompressedPreview(null);
        setCompressedSize(null);
        form.resetField("cover_image");
      }
    },
    [completedCrop, targetWidth, targetHeight, cropImage, resizeImage, form]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = () => {
        setOriginalPreview(reader.result as string);
        setOriginalSize(file.size);
        form.setValue("cover_image", file);
        setShowCrop(true);
      };
      reader.readAsDataURL(file);
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("Submitting form data:", data);
    // Here you would typically send the data to your server
    // For example:
    // const formData = new FormData();
    // formData.append('cover_image', data.cover_image);
    // await fetch('/api/upload', { method: 'POST', body: formData });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Image Upload and Compression</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
          <FormField
            name="cover_image"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <div {...getRootProps()} className={styles.dropzone}>
                    {isDragActive ? (
                      <p>Drop the image here ...</p>
                    ) : (
                      <p>Click to select one</p>
                    )}
                    <input
                      type="file"
                      {...getInputProps()}
                      className="hidden"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) {
                          field.onChange(file);
                          onDrop([file]);
                        }
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className={styles.inputGroup}>
            <div>
              <label htmlFor="target-width">Target Width (px)</label>
              <input
                id="target-width"
                type="number"
                value={targetWidth}
                onChange={(e) => setTargetWidth(Number(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="target-height">Target Height (px)</label>
              <input
                id="target-height"
                type="number"
                value={targetHeight}
                onChange={(e) => setTargetHeight(Number(e.target.value))}
              />
            </div>
          </div>

          {originalPreview && showCrop && (
            <div className={styles.cropSection}>
              <h3 className={styles.cropTitle}>Crop Image</h3>
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={targetWidth / targetHeight}
              >
                <Image
                  width={targetWidth}
                  height={targetHeight}
                  ref={imgRef}
                  src={originalPreview}
                  alt="Original"
                />
              </ReactCrop>
              <button
                onClick={() => processImage(form.getValues("cover_image"))}
                className={styles.btn}
              >
                Apply Crop and Compress
              </button>
            </div>
          )}

          <div className={styles.previewContainer}>
            {originalPreview && (
              <div>
                <h3 className={styles.previewSection}>Original Image</h3>
                <div className={styles.imageWrapper}>
                  <Image
                    src={originalPreview}
                    alt="Original preview"
                    priority
                    className={styles.img}
                    height={200}
                    width={200}
                  />
                </div>
                <p className={styles.sizeText}>
                  Size: {(originalSize! / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            )}
            {compressedPreview && (
              <div className={styles.previewSection}>
                <h3>Compressed & Resized Image</h3>
                <div className={styles.imageWrapper}>
                  <Image
                    src={compressedPreview}
                    alt="Compressed preview"
                    priority
                    className={styles.img}
                    height={200}
                    width={200}
                  />
                </div>
                <p className={styles.sizeText}>
                  Size: {(compressedSize! / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            )}
          </div>

          {compressedPreview && originalSize && compressedSize && (
            <div className="mt-4">
              <p>
                Compression ratio:{" "}
                {((1 - compressedSize / originalSize) * 100).toFixed(2)}%
              </p>
            </div>
          )}

          <button
            type="submit"
            className={styles.btn}
            disabled={!form.getValues("cover_image")}
          >
            Upload Compressed & Resized Image
          </button>
        </form>
      </Form>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}
