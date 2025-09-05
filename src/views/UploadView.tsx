import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Upload, ShieldCheck } from "lucide-react";
import { ViewType, ImageData } from "../types";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Pill from "../components/ui/Pill";
import SectionTitle from "../components/ui/SectionTitle";
import RobustImage from "../components/ui/RobustImage";

interface UploadViewProps {
  queue: ImageData[];
  onQueueUpdate: (queue: ImageData[]) => void;
  onNavigate: (view: ViewType) => void;
}

const UploadDropzone: React.FC<{ onFiles: (files: File[]) => void }> = ({
  onFiles,
}) => {
  const [active, setActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setActive(true);
      }}
      onDragLeave={() => setActive(false)}
      onDrop={(e) => {
        e.preventDefault();
        setActive(false);
        const files = Array.from(e.dataTransfer.files || []);
        if (files.length) onFiles(files);
      }}
      className={`grid place-items-center rounded-2xl border-2 border-dashed p-10 text-center transition-all ${
        active ? "border-blue-500 bg-blue-500/10" : "border-white/20 bg-white/5"
      }`}
      role="button"
      aria-label="Upload images by browsing or drag and drop"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          inputRef.current?.click();
        }
      }}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="rounded-2xl bg-white/10 p-3">
          <Upload className="h-6 w-6 text-white" />
        </div>
        <p className="text-white/90">
          <span className="font-semibold">Click to upload</span> or drag & drop
        </p>
        <p className="text-xs text-white/60">PNG, JPG up to ~10MB each</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            if (files.length) onFiles(files);
          }}
        />
      </div>
    </div>
  );
};

const UploadView: React.FC<UploadViewProps> = ({
  queue,
  onQueueUpdate,
  onNavigate,
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="space-y-6"
    >
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Upload images</h1>
          <p className="text-white/60">
            Add clear photos of floors. We'll automatically compress and scan
            for safety.
          </p>
        </div>
        <Pill className="bg-white/10 text-white/80">
          <ShieldCheck className="h-4 w-4" /> Sensitive content scan enabled
        </Pill>
      </div>

      <Card className="p-6">
        <UploadDropzone
          onFiles={(files) => {
            // Demo: Pretend we queued them
            onQueueUpdate([
              ...files.map((f, i) => ({
                id: `${f.name}-${i}`,
                url: URL.createObjectURL(f),
                fallback: f.name,
              })),
              ...queue,
            ]);
          }}
        />

        <div className="mt-6">
          <SectionTitle
            title="Queued images"
            subtitle="These will be available for labeling"
          />
          {queue.length === 0 ? (
            <p className="text-white/60">No images in queue yet.</p>
          ) : (
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6 md:gap-3">
              {queue.slice(2).map((im) => (
                <div
                  key={im.id}
                  className="overflow-hidden rounded-2xl border border-white/10"
                >
                  <RobustImage
                    src={im.url}
                    alt="Queued"
                    className="h-28 w-full object-cover"
                    fallbackText="Queued"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={() => onNavigate("label4")} className="px-5">
            Start labeling
          </Button>
        </div>
      </Card>
    </motion.section>
  );
};

export default UploadView;
