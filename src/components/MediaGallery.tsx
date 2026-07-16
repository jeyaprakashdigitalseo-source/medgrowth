import { useState } from "react";
import { MediaItem } from "../types";
import {
  Download,
  Share2,
  ExternalLink,
  Eye,
  Filter,
  Layers,
  Search,
  FileText,
  Video,
  Play,
  Heart,
  Image as ImageIcon
} from "lucide-react";

interface MediaGalleryProps {
  mediaItems: MediaItem[];
  onUploadMediaClick: () => void;
}

export default function MediaGallery({ mediaItems, onUploadMediaClick }: MediaGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  const filters = [
    "All",
    "Newspaper",
    "TV",
    "Reels",
    "Videos",
    "Photos",
    "Testimonials",
    "Posters",
    "Certificates"
  ];

  const filteredItems = mediaItems.filter(
    (item) => activeFilter === "All" || item.category === activeFilter
  );

  return (
    <div className="space-y-6">
      {/* Category Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        {/* Horizontal scrollable filters for compact screens */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          {filters.map((filter) => (
            <button
              id={`media-filter-${filter}`}
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                activeFilter === filter
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-500/10"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100/50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <button
          id="gallery-upload-btn"
          onClick={onUploadMediaClick}
          className="flex items-center justify-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
        >
          <Filter className="h-3.5 w-3.5 text-slate-400" />
          <span>Upload Asset</span>
        </button>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredItems.map((item) => (
          <div
            id={`media-item-card-${item.id}`}
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group glass-card rounded-2xl overflow-hidden cursor-pointer relative bg-white transition-all duration-200 hover:shadow-md border border-slate-200/80"
          >
            {/* Aspect container with nice overlays */}
            <div className={`relative w-full overflow-hidden bg-slate-900 ${item.aspect}`}>
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Overlay with details */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3.5">
                <span className="self-start text-[9px] font-bold bg-white/25 text-white backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10 uppercase tracking-widest">
                  {item.category}
                </span>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex gap-1.5">
                    <button className="h-7 w-7 rounded-lg bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30 transition-all">
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    <button className="h-7 w-7 rounded-lg bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30 transition-all">
                      <Download className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="text-[9px] text-slate-300 font-medium">{item.date}</span>
                </div>
              </div>

              {/* Video Play indicator overlay */}
              {(item.category === "TV" || item.category === "Videos" || item.category === "Reels") && (
                <div className="absolute top-3.5 right-3.5 h-6 w-6 rounded-full bg-slate-900/45 backdrop-blur-md border border-white/25 flex items-center justify-center text-white">
                  <Play className="h-3 w-3 fill-white ml-0.5" />
                </div>
              )}
            </div>

            {/* Info panel */}
            <div className="p-3.5">
              <h4 className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h4>
              <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400 font-medium">
                <span>{item.category} file</span>
                <span className="text-slate-500 font-mono text-[9px]">{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Media Lightbox Overlay Modal */}
      {selectedItem && (
        <div
          id="media-lightbox-overlay"
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-[24px] max-w-2xl w-full overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-150 border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Visual Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest px-2 py-0.5 bg-blue-50 border border-blue-100 rounded-md">
                  {selectedItem.category} Channel
                </span>
                <h3 className="text-sm font-bold text-slate-800 mt-1">{selectedItem.title}</h3>
              </div>
              <button
                id="close-lightbox"
                onClick={() => setSelectedItem(null)}
                className="h-8 w-8 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center font-bold text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Main Preview Container */}
            <div className="bg-slate-900 aspect-video flex items-center justify-center relative overflow-hidden group/modal">
              <img
                src={selectedItem.thumbnail}
                alt={selectedItem.title}
                className="max-h-full max-w-full object-contain"
                referrerPolicy="no-referrer"
              />
              {(selectedItem.category === "TV" || selectedItem.category === "Videos" || selectedItem.category === "Reels") && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/20">
                  <div className="h-14 w-14 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:scale-105 transition-transform duration-200 cursor-pointer shadow-lg">
                    <Play className="h-6 w-6 fill-white ml-1" />
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions Row */}
            <div className="p-5 bg-slate-50 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Uploaded: July 2026</span>
              <div className="flex gap-2">
                <button
                  onClick={() => alert("Asset shareable link copied to clipboard!")}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  <Share2 className="h-3.5 w-3.5 text-slate-400" />
                  <span>Copy Asset Link</span>
                </button>
                <a
                  href={selectedItem.thumbnail}
                  download={selectedItem.title}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download Original</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
