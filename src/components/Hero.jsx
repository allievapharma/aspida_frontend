import React from "react";

const Hero = () => {
  return (
    <>
      <div className="w-full flex flex-col items-start gap-3 isolate">
        <a
          className="w-full flex flex-col items-start gap-3 isolate"
          href="/free-animation/gradient-loader-02-juQh1tTYA0"
        >
          <div
            className="relative w-full overflow-hidden transition-all duration-200 rounded-2xl aspect-lottie-thumbnail border border-border hover:ring-2 hover:ring-primary/80"
            style={{ backgroundColor: "rgb(255, 255, 255)" }}
          >
            <div className="w-full h-full" style={{ transform: "scale(1)" }}>
              <div className="flex flex-col h-full w-full relative">
                <div className="flex-1 overflow-hidden">
                  <div
                    className="w-full h-full"
                    style={{ transform: "scale(1)" }}
                  >
                    <div className="w-full h-full">
                      <canvas
                        style={{ width: "100%", height: "100%" }}
                        width="443"
                        height="290"
                      ></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>

        <div className="flex items-center justify-between w-full">
          <a
            className="flex items-center"
            href="/JAStudio"
            target="_self"
            data-discover="true"
          >
            <span
              data-slot="avatar"
              className="relative flex size-8 shrink-0 overflow-hidden rounded-full h-6 w-6 text-xs mr-2"
              role="button"
            >
              <img
                data-slot="avatar-image"
                className="aspect-square size-full"
                alt="JAStudio"
                src="https://accounts-assets.lottiefiles.com/avatars/300_3635-1399678051.jpg"
              />
            </span>
            <p className="text-sm">JAStudio</p>
          </a>

          <div>
            <div>
              <div
                role="button"
                className="flex items-center gap-1 pr-3 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-download w-4 h-4"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" x2="12" y1="15" y2="3"></line>
                </svg>
                <p className="text-xs">10.0K</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
