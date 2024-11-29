import { X } from "lucide-react";
import { Pool } from "../../helpers/helper";
import { useState } from "react";
import SpecPill from "./SpecPill";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  selectedPool: Pool;
}

const Modal = ({ isOpen, setIsOpen, selectedPool }: ModalProps) => {

  const [selectedSample, setSelectedSample] = useState(selectedPool?.samples[0]);

  return (
    <>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-[#ffffff] bg-opacity-50 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative z-10 bg-[#e8e8e8] rounded-2xl shadow-lg max-w-[34rem] w-full md:p-4 p-2 mx-3">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-2xl font-semibold">{selectedPool.name} Samples</h2>
              <button
                className="w-7 h-7 grid place-items-center bg-[#ff5151] rounded-full text-[white] hover:scale-105 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                <X size={16} />
              </button>
            </div>
            {/* Samples */}
            <div className="pb-4 border-b border-[#00000033] mb-4">
              <div className="flex justify-between gap-2 mb-4">
                <div className="max-w-[65%]">
                  <img className="rounded-md" src={selectedSample} alt="" />
                </div>
                <div className="w-full bg-slate-300 rounded-md grid place-items-center">
                  Dig Image
                </div>
              </div>
              <div className="flex gap-2 w-full overflow-scroll no-scrollbar">
                {selectedPool.samples.map(url => (
                  <img onClick={() => setSelectedSample(url)} className={`w-12 h-12 rounded-md cursor-pointer ${url !== selectedSample ? "opacity-50" : "border-2 border-black"}`} src={url} alt="" />
                ))}
              </div>
            </div>
            {/* Pool specifications */}
            <div className="flex flex-wrap gap-2">
              {Object.entries(selectedPool.specs).map(e => (
                <SpecPill spec={e} />
              ))}
            </div>
            {/* Add more modal content here */}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;