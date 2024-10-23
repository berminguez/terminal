"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Maximize } from "lucide-react";

const CLAVE_SECRETA = "dinero";
const RUTA_FICTICIA = "C:\\DonCarlos> ";

export default function TerminalSecreta() {
  const [input, setInput] = useState("");
  const [mensajes, setMensajes] = useState(["Clave secreta: "]);
  const [claveCorrecta, setClaveCorrecta] = useState(false);
  const inputRef = useRef(null);
  const audioRef = useRef(null);
  const [pantallaCompleta, setPantallaCompleta] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && pantallaCompleta) {
        document.documentElement.requestFullscreen().catch((e) => {
          console.error(
            `Error al intentar entrar en pantalla completa: ${e.message}`
          );
        });
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [pantallaCompleta]);

  const reproducirAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const entrarPantallaCompleta = () => {
    document.documentElement
      .requestFullscreen()
      .then(() => {
        setPantallaCompleta(true);
      })
      .catch((e) => {
        console.error(
          `Error al intentar entrar en pantalla completa: ${e.message}`
        );
      });
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
    } else if (
      claveCorrecta &&
      input.toLowerCase() === "close" &&
      pantallaCompleta
    ) {
      document.exitFullscreen();
      setPantallaCompleta(false);
      setMensajes((prev) => [
        ...prev,
        input,
        "Saliendo de pantalla completa...",
      ]);
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
        {!pantallaCompleta && (
          <button
            type="button"
            onClick={entrarPantallaCompleta}
            className="ml-2 text-white hover:text-green-500 focus:outline-none"
          >
            <Maximize size={20} />
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
