import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductImage, parseGallery } from "./ProductImage";

const focus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#217938] focus-visible:ring-offset-2";

export interface ProductGalleryProps {
  galleryJson?: string | null;
  primaryImage?: string | null;
  title: string;
}

export function ProductGallery({
  galleryJson,
  primaryImage,
  title,
}: ProductGalleryProps) {
  const images = parseGallery(galleryJson);
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const opener = useRef<HTMLButtonElement | null>(null);
  const index = Math.min(selected, Math.max(0, images.length - 1));
  const image = images[index];
  const change = (delta: number) =>
    setSelected((index + delta + images.length) % images.length);
  const enlarge = (button: HTMLButtonElement, nextIndex = index) => {
    opener.current = button;
    setSelected(nextIndex);
    setOpen(true);
  };

  // A primary URL is usable when an association is unavailable, but never invent
  // higher-resolution URLs or duplicate it into a fabricated gallery.
  if (!image)
    return (
      <ProductImage
        src={primaryImage}
        alt={title}
        aspect="detail"
        loading="eager"
      />
    );

  return (
    <div>
      <button
        type="button"
        aria-label={`Enlarge ${title}, photo ${index + 1}`}
        className={`block w-full ${focus}`}
        onClick={event => enlarge(event.currentTarget)}
      >
        <ProductImage
          src={image.detail}
          alt={`${title}, photo ${index + 1}`}
          width={image.width}
          height={image.height}
          aspect="detail"
          loading={index === 0 ? "eager" : "lazy"}
        />
      </button>
      <p className="mt-3 flex items-center gap-2 text-sm text-stone-600">
        <Expand aria-hidden="true" className="h-4 w-4" /> Select a photo, then
        click the main image to enlarge.
      </p>
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {images.map((item, position) => (
            <div key={item.full}>
              <button
                type="button"
                aria-label={`Select photo ${position + 1} of ${title}`}
                aria-pressed={index === position}
                className={`block w-full ${focus} ${index === position ? "ring-2 ring-[#217938] ring-offset-2" : ""}`}
                onClick={() => setSelected(position)}
              >
                <ProductImage
                  src={item.thumb}
                  alt={`${title}, thumbnail ${position + 1}`}
                  aspect="thumbnail"
                  loading="lazy"
                />
              </button>
              <button
                type="button"
                aria-label={`Enlarge photo ${position + 1} of ${title}`}
                className={`mt-2 w-full py-1 text-xs text-[#217938] underline ${focus}`}
                onClick={event => enlarge(event.currentTarget, position)}
              >
                Enlarge photo {position + 1}
              </button>
            </div>
          ))}
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        {open && (
          <DialogContent
            className="max-h-[95vh] overflow-y-auto border-2 border-black bg-[#f5f1e8] sm:max-w-5xl"
            onCloseAutoFocus={event => {
              event.preventDefault();
              opener.current?.focus();
            }}
            onKeyDown={event => {
              if (images.length < 2) return;
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                change(-1);
              }
              if (event.key === "ArrowRight") {
                event.preventDefault();
                change(1);
              }
            }}
          >
            <DialogTitle className="pr-7">{title}</DialogTitle>
            <DialogDescription>
              Photo {index + 1} of {images.length}. Use arrow keys to browse and
              Escape to close.
            </DialogDescription>
            <ProductImage
              src={image.full}
              alt={`${title}, enlarged photo ${index + 1}`}
              aspect="lightbox"
              loading="eager"
            />
            {images.length > 1 && (
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  aria-label="Previous photo"
                  className={`inline-flex min-h-11 items-center gap-2 border-2 border-black px-4 ${focus}`}
                  onClick={() => change(-1)}
                >
                  <ChevronLeft aria-hidden="true" className="h-4 w-4" />{" "}
                  Previous
                </button>
                <button
                  type="button"
                  aria-label="Next photo"
                  className={`inline-flex min-h-11 items-center gap-2 border-2 border-black px-4 ${focus}`}
                  onClick={() => change(1)}
                >
                  Next <ChevronRight aria-hidden="true" className="h-4 w-4" />
                </button>
              </div>
            )}
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}

export default ProductGallery;
