"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play } from "lucide-react";

const CLAVE_SECRETA = "abretesesamo"; // Cambia esto a la clave secreta que desees
const RUTA_FICTICIA = "C:\\DonCarlos> ";

export default function TerminalSecreta() {
  const [input, setInput] = useState("");
  const [mensajes, setMensajes] = useState(["Clave secreta: "]);
  const [claveCorrecta, setClaveCorrecta] = useState(false);
  const inputRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [mensajes]);

  const reproducirAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!claveCorrecta && input.toLowerCase() === CLAVE_SECRETA) {
      setClaveCorrecta(true);
      setMensajes((prev) => [
        ...prev,
        input,
        "Clave correcta. Reproduciendo audio...",
      ]);
      reproducirAudio();
    } else if (claveCorrecta && input.toLowerCase() === "play") {
      setMensajes((prev) => [...prev, input, "Reproduciendo audio..."]);
      reproducirAudio();
    } else if (!claveCorrecta) {
      setMensajes((prev) => [
        ...prev,
        input,
        "Clave secreta incorrecta",
        "Clave secreta: ",
      ]);
    } else {
      setMensajes((prev) => [
        ...prev,
        input,
        "Comando no reconocido. Usa 'play' para reproducir el audio.",
      ]);
    }
    setInput("");
  };

  return (
    <div className="bg-black text-white p-4 font-mono h-screen overflow-auto">
      <div>
        {mensajes.map((mensaje, index) => (
          <div
            key={index}
            className={
              mensaje === "Clave correcta. Reproduciendo audio..." ||
              mensaje === "Reproduciendo audio..."
                ? "text-green-500"
                : ""
            }
          >
            {index === 0 || mensaje === "Clave secreta: "
              ? mensaje
              : `${RUTA_FICTICIA}${mensaje}`}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-2 flex items-center">
        <span>{RUTA_FICTICIA}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-black text-white outline-none flex-grow ml-1"
          ref={inputRef}
        />
        {claveCorrecta && (
          <button
            type="button"
            onClick={reproducirAudio}
            className="ml-2 text-white hover:text-green-500 focus:outline-none"
          >
            <Play size={20} />
          </button>
        )}
      </form>
      <audio
        ref={audioRef}
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/distorted_audio-vB9TR6x3ZzbUu4FErh0YsaHQgcHZdl.mp3"
      />
    </div>
  );
}
