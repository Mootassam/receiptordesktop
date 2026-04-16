import html2canvas from "html2canvas";

class Screenshot {
  static async handleCaptureScreenshot(
    divRef: React.RefObject<HTMLElement>
  ) {
    if (!divRef.current) return;

    const element = divRef.current;

    // Wait for fonts to load properly
    await document.fonts.ready;

    try {
      // 🔥 Get exact rendered size (prevents subpixel bugs)
      const rect = element.getBoundingClientRect();

      const canvas = await html2canvas(element, {
        scale: Math.max(2, window.devicePixelRatio),
        useCORS: true,
        allowTaint: false,
        backgroundColor: null, // 👈 prevents white artifacts
        logging: false,
        imageTimeout: 0,

        // 🔥 Force exact dimensions
        width: Math.floor(rect.width),
        height: Math.floor(rect.height),
        windowWidth: Math.floor(rect.width),
        windowHeight: Math.floor(rect.height),

        scrollX: 0,
        scrollY: 0,

        onclone: (clonedDoc) => {
          // Ensure images are fully loaded
          const images = clonedDoc.querySelectorAll("img");
          images.forEach((img) => {
            if (!img.complete) {
              img.decode().catch(() => {});
            }
          });
        },
      });

      // 🔥 HARD FIX: remove 1px from right (kills white line 100%)
      const finalCanvas = document.createElement("canvas");
      const ctx = finalCanvas.getContext("2d");

      finalCanvas.width = canvas.width - 0.3; // 👈 key fix
      finalCanvas.height = canvas.height;

      ctx?.drawImage(canvas, 0, 0);

      // Convert to blob
      const blob = await new Promise<Blob | null>((resolve) => {
        finalCanvas.toBlob(resolve, "image/png", 1.0);
      });

      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        console.log("✅ Screenshot copied (no white line)");
      }
    } catch (error) {
      console.error("❌ Screenshot failed:", error);
    }
  }
}

export default Screenshot;