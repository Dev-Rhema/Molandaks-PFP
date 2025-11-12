import { TRAITLIST } from "./TraitList.jsx";
import { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";
import { FiDownload } from "react-icons/fi";
import { TbArrowsShuffle } from "react-icons/tb";
import logo from "../public/Logo.svg";

function App() {
  // State for managing selected category and traits
  const [selectedCategory, setSelectedCategory] = useState("Skin");
  const [selectedTraits, setSelectedTraits] = useState({
    background: TRAITLIST.Background[1],
    skin: TRAITLIST.Skin[0],
    eyes: TRAITLIST.Eyes[0],
    mouth: TRAITLIST.Mouth[0],
    headgear: TRAITLIST.Headgear[1], // Start with "None" option
    faceAccessory: TRAITLIST.FaceAccessory[2], // Start with "None" option
    shirt: TRAITLIST.Shirt[0],
  });

  const canvasRef = useRef(null);

  const downloadImage = () => {
    if (canvasRef.current === null) {
      return;
    }

    htmlToImage
      .toPng(canvasRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-molandak.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Error downloading image:", err);
      });
  };

  const randomizeLook = () => {
    const getRandomTrait = (array) =>
      array[Math.floor(Math.random() * array.length)];

    setSelectedTraits({
      background: getRandomTrait(TRAITLIST.Background),
      skin: getRandomTrait(TRAITLIST.Skin),
      eyes: getRandomTrait(TRAITLIST.Eyes),
      mouth: getRandomTrait(TRAITLIST.Mouth),
      headgear: getRandomTrait(TRAITLIST.Headgear),
      faceAccessory: getRandomTrait(TRAITLIST.FaceAccessory),
      shirt: getRandomTrait(TRAITLIST.Shirt),
    });
  };
  // Handler for selecting a trait
  const handleSelectTrait = (category, trait) => {
    // Convert category names to match state keys
    const stateKeys = {
      Skin: "skin",
      Eyes: "eyes",
      Mouth: "mouth",
      Headgear: "headgear",
      FaceAccessory: "faceAccessory",
      Shirt: "shirt",
      Background: "background",
    };

    setSelectedTraits((prev) => ({
      ...prev,
      [stateKeys[category]]: trait,
    }));
  };

  // Get options for the selected category
  const categoryOptions = selectedCategory ? TRAITLIST[selectedCategory] : [];

  return (
    <>
      <div
        className="flex items-center justify-center p-6 max-md:p-4 min-h-screen flex-col gap-6"
        style={{
          // public/ files are served from the site root in Vite/Vercel
          backgroundImage: `url('/mainbg.jpg')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <img src={logo} alt="" />
        <main className=" w-[70vw]  m-auto flex max-lg:w-full h-full">
          {/* MAIN CONTAINER */}
          <div
            className="bg-white/20 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm border border-white/30 grid grid-cols-2 max-lg:grid-cols-1 items-center justify-center h-full w-full px-8 max-md:p-4
           py-4"
          >
            {/* Canvas Section*/}
            <div className="relative w-full rounded-2xl">
              <div
                ref={canvasRef}
                className="w-full grid rounded-2xl overflow-hidden"
              >
                <img
                  src={selectedTraits.background.src}
                  alt={selectedTraits.background.name}
                  className="row-start-1 col-start-1 w-full h-full "
                />
                <img
                  src={selectedTraits.skin.src}
                  alt={selectedTraits.skin.name}
                  className="row-start-1 col-start-1 w-full h-full"
                />
                <img
                  src={selectedTraits.eyes.src}
                  alt={selectedTraits.eyes.name}
                  className="row-start-1 col-start-1 w-full h-full"
                />
                <img
                  src={selectedTraits.faceAccessory.src}
                  alt={selectedTraits.faceAccessory.name}
                  className="row-start-1 col-start-1 w-full h-full"
                />
                <img
                  src={selectedTraits.headgear.src}
                  alt={selectedTraits.headgear.name}
                  className="row-start-1 col-start-1 w-full h-full"
                />

                <img
                  src={selectedTraits.mouth.src}
                  alt={selectedTraits.mouth.name}
                  className="row-start-1 col-start-1 w-full h-full"
                />
                <img
                  src={selectedTraits.shirt.src}
                  alt={selectedTraits.shirt.name}
                  className="row-start-1 col-start-1 w-full h-full"
                />
              </div>
              <div className="absolute bottom-4 right-4 flex flex-col gap-3 max-md:right-2 max-md:bottom-2">
                <button
                  onClick={randomizeLook}
                  className="p-3 max-lg:p-2 max-md:p-1 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 ease-in-out hover:rotate-180 relative overflow-hidden group"
                  title="Randomize"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-fuchsia-500 via-purple-600 to-pink-500 group-hover:from-pink-500 group-hover:via-purple-600 group-hover:to-fuchsia-500 transition-all duration-300"></div>
                  <div className="relative z-10 text-white">
                    <TbArrowsShuffle className="w-6 h-6 max-lg:w-5 max-md:w-4 max-lg:h-5 max-md:h-4" />
                  </div>
                </button>
                <button
                  onClick={downloadImage}
                  className="p-3 max-lg:p-2 max-md:p-1 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 ease-in-out hover:-translate-y-1 relative overflow-hidden group"
                  title="Download"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-cyan-400 via-blue-500 to-indigo-500 group-hover:from-indigo-500 group-hover:via-blue-500 group-hover:to-cyan-400 transition-all duration-300"></div>
                  <div className="relative z-10 text-white">
                    <FiDownload className="w-6 h-6 max-lg:w-5 max-md:w-4 max-lg:h-5 max-md:h-4" />
                  </div>
                </button>
              </div>
            </div>

            {/* SELECTOR SECTION */}
            <div className="h-[80%] w-[80%] grid grid-cols-10 gap-2 self-center justify-self-end max-lg:w-full max-lg:h-[90%] overflow-hidden">
              {/* trait list */}
              <div className="col-span-3  flex flex-col gap-2 py-5 items-center overflow-y-auto hide-scrollbar px-2 bg-white/20 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm border border-white/30">
                <button
                  onClick={() => setSelectedCategory("Skin")}
                  className={`shadow-lg hover:shadow-xl transition-all duration-300 rounded-md ${
                    selectedCategory === "Skin"
                      ? "ring-2 ring-white ring-offset-2 ring-offset-white/20 shadow-white/50"
                      : ""
                  }`}
                >
                  <img
                    src={selectedTraits.skin.src}
                    alt=""
                    className="size-20 object-cover border border-purple-900 hover:border-white max-lg:size-10 rounded-md"
                  />
                </button>
                <button
                  onClick={() => setSelectedCategory("Shirt")}
                  className={`shadow-lg hover:shadow-xl transition-all duration-300 rounded-md ${
                    selectedCategory === "Shirt"
                      ? "ring-2 ring-white ring-offset-2 ring-offset-white/20 shadow-white/50"
                      : ""
                  }`}
                >
                  <img
                    src={selectedTraits.shirt.src}
                    alt=""
                    className="size-20 object-cover border border-purple-900 hover:border-white max-lg:size-10 rounded-md"
                  />
                </button>
                <button
                  onClick={() => setSelectedCategory("Headgear")}
                  className={`shadow-lg hover:shadow-xl transition-all duration-300 ${
                    selectedCategory === "Headgear"
                      ? "ring-2 ring-white ring-offset-2 ring-offset-pink-900 shadow-white/25 rounded-md"
                      : ""
                  }`}
                >
                  <img
                    src={selectedTraits.headgear.src}
                    alt=""
                    className="size-20 object-cover border border-purple-900 hover:border-white max-lg:size-10 rounded-md"
                  />
                </button>
                <button
                  onClick={() => setSelectedCategory("Eyes")}
                  className={`shadow-lg hover:shadow-xl transition-all duration-300 rounded-md ${
                    selectedCategory === "Eyes"
                      ? "ring-2 ring-white ring-offset-2 ring-offset-white/20 shadow-white/50"
                      : ""
                  }`}
                >
                  <img
                    src={selectedTraits.eyes.src}
                    alt=""
                    className="size-20 object-cover border border-purple-900 hover:border-white max-lg:size-10 rounded-md"
                  />
                </button>
                <button
                  onClick={() => setSelectedCategory("Mouth")}
                  className={`shadow-lg hover:shadow-xl transition-all duration-300 rounded-md ${
                    selectedCategory === "Mouth"
                      ? "ring-2 ring-white ring-offset-2 ring-offset-white/20 shadow-white/50"
                      : ""
                  }`}
                >
                  <img
                    src={selectedTraits.mouth.src}
                    alt=""
                    className="size-20 object-cover border border-purple-900 hover:border-white max-lg:size-10 rounded-md"
                  />
                </button>
                <button
                  onClick={() => setSelectedCategory("FaceAccessory")}
                  className={`shadow-lg hover:shadow-xl transition-all duration-300 rounded-md ${
                    selectedCategory === "FaceAccessory"
                      ? "ring-2 ring-white ring-offset-2 ring-offset-white/20 shadow-white/50"
                      : ""
                  }`}
                >
                  <img
                    src={selectedTraits.faceAccessory.src}
                    alt=""
                    className="size-20 object-cover border border-purple-900 hover:border-white max-lg:size-10 rounded-md"
                  />
                </button>
                <button
                  onClick={() => setSelectedCategory("Background")}
                  className={`shadow-lg hover:shadow-xl transition-all duration-300 rounded-md ${
                    selectedCategory === "Background"
                      ? "ring-2 ring-white ring-offset-2 ring-offset-white/20 shadow-white/50"
                      : ""
                  }`}
                >
                  <img
                    src={selectedTraits.background.src}
                    alt=""
                    className="size-20 object-cover border border-purple-900 hover:border-white max-lg:size-10 rounded-md"
                  />
                </button>
              </div>

              {/* Trait Options Grid */}
              <div className="col-span-7 p-4 overflow-y-auto hide-scrollbar bg-white/20 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm border border-white/30">
                <div className="grid grid-cols-3 gap-4">
                  {categoryOptions.map((trait) => (
                    <button
                      key={trait.id}
                      onClick={() => handleSelectTrait(selectedCategory, trait)}
                      className="shadow-lg hover:shadow-xl transition-all duration-300 hover:ring-2 hover:ring-white hover:ring-offset-2 hover:ring-offset-white/20 rounded-md"
                    >
                      <img
                        src={trait.src}
                        alt={trait.name}
                        className="w-full aspect-square object-cover border border-purple-900 rounded-md"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
        <a
          href="https://x.com/dev_rhema"
          target="_blank"
          className="text-white font-bold text-lg"
        >
          &copy; Dev Rhema
        </a>
      </div>
    </>
  );
}

export default App;
