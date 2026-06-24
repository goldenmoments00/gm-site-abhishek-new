import { morganite, nyghtSerif, plusJakartaSans } from "@/lib/fonts";

export default function FontShowcase() {
  return (
    <div className="p-8 space-y-8">
      {/* Using className approach */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Using className approach:</h2>
        <h1 className={`${morganite.className} text-4xl font-bold`}>
          Morganite Display Font
        </h1>
        <h2 className={`${nyghtSerif.className} text-2xl font-medium`}>
          Nyght Serif Elegant Font
        </h2>
        <p className={`${plusJakartaSans.className} text-base font-normal`}>
          Plus Jakarta Sans body text for excellent readability
        </p>
      </div>

      {/* Using Tailwind utility classes */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">
          Using Tailwind utility classes:
        </h2>
        <h1 className="font-morganite text-4xl font-bold text-amber-600">
          Morganite with Tailwind
        </h1>
        <h2 className="font-nyght-serif text-2xl font-medium text-slate-700">
          Nyght Serif with Tailwind
        </h2>
        <p className="font-plus-jakarta-sans text-base font-normal text-gray-600">
          Plus Jakarta Sans with Tailwind utilities
        </p>
      </div>

      {/* Font weights demonstration */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold mb-4">Font weights available:</h2>
        <div className="space-y-2">
          <p className="font-morganite font-light text-lg">
            Morganite Light (300)
          </p>
          <p className="font-morganite font-normal text-lg">
            Morganite Regular (400)
          </p>
          <p className="font-morganite font-medium text-lg">
            Morganite Medium (500)
          </p>
          <p className="font-morganite font-bold text-lg">
            Morganite Bold (700)
          </p>
        </div>
      </div>
    </div>
  );
}
