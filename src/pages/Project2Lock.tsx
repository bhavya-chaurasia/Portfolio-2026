import { ChangeEvent, ClipboardEvent, FC, KeyboardEvent, useEffect, useRef, useState } from "react";
import { ArrowLeft, LockKeyhole, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageParticlesBackground from "@/components/ui/page-particles-background";
import { useLoaderNavigate } from "@/hooks/use-loader-navigate";
import { usePageReady } from "@/hooks/use-page-ready";
import { getRouteLoaderConfig } from "@/lib/route-loader-config";
import {
  PROJECT_2_PASSWORD,
  PROJECT_2_PIN_LENGTH,
  PROJECT_2_UNLOCK_KEY,
} from "@/constants/project2Access";
import "./Project2Lock.css";

const Project2Lock: FC = () => {
  const [digits, setDigits] = useState<string[]>(Array(PROJECT_2_PIN_LENGTH).fill(""));
  const [error, setError] = useState("");
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();
  const loaderNavigate = useLoaderNavigate((to) => getRouteLoaderConfig(to, true));

  usePageReady({ delayMs: 160 });

  useEffect(() => {
    window.scrollTo(0, 0);
    inputRefs.current[0]?.focus();
  }, []);

  const unlockProject = () => {
    sessionStorage.setItem(PROJECT_2_UNLOCK_KEY, "true");
    loaderNavigate("/project-2");
  };

  const verifyPin = (nextDigits: string[]) => {
    const pin = nextDigits.join("");
    if (pin.length !== PROJECT_2_PIN_LENGTH) return;

    if (pin === PROJECT_2_PASSWORD) {
      setError("");
      unlockProject();
      return;
    }

    setError("Incorrect password. Please try again.");
    setDigits(Array(PROJECT_2_PIN_LENGTH).fill(""));
    window.setTimeout(() => inputRefs.current[0]?.focus(), 0);
  };

  const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, "");
    if (!value) {
      const nextDigits = [...digits];
      nextDigits[index] = "";
      setDigits(nextDigits);
      return;
    }

    const nextDigits = [...digits];
    value
      .slice(0, PROJECT_2_PIN_LENGTH - index)
      .split("")
      .forEach((digit, offset) => {
        nextDigits[index + offset] = digit;
      });

    setDigits(nextDigits);
    setError("");

    const nextEmptyIndex = nextDigits.findIndex((digit) => digit === "");
    const focusIndex = nextEmptyIndex === -1 ? PROJECT_2_PIN_LENGTH - 1 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
    verifyPin(nextDigits);
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedDigits = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, PROJECT_2_PIN_LENGTH)
      .split("");

    if (!pastedDigits.length) return;

    const nextDigits = Array(PROJECT_2_PIN_LENGTH)
      .fill("")
      .map((_, index) => pastedDigits[index] ?? "");

    setDigits(nextDigits);
    setError("");
    inputRefs.current[Math.min(pastedDigits.length, PROJECT_2_PIN_LENGTH) - 1]?.focus();
    verifyPin(nextDigits);
  };

  return (
    <main className="project2-lock-page">
      <PageParticlesBackground dark />
      <button
        className="project2-lock-back"
        type="button"
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        <ArrowLeft size={18} strokeWidth={1.8} />
      </button>

      <section className="project2-lock-shell" aria-label="Project 2 password gate">
        <div className="project2-lock-orbit" aria-hidden="true" />
        <div className="project2-lock-card">
          <div className="project2-lock-icon" aria-hidden="true">
            <LockKeyhole size={28} strokeWidth={1.6} />
          </div>

          <p className="project2-lock-kicker">Protected case study</p>
          <h1>Enter password</h1>
          <p className="project2-lock-copy">
            This project is locked. Enter the 6 digit password to view the Maruti
            Service Experience case study.
          </p>

          <div className="project2-lock-pin" role="group" aria-label="6 digit password">
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(node) => {
                  inputRefs.current[index] = node;
                }}
                aria-label={`Digit ${index + 1}`}
                autoComplete="one-time-code"
                className={error ? "project2-lock-pin-input is-error" : "project2-lock-pin-input"}
                inputMode="numeric"
                maxLength={1}
                onChange={(event) => handleChange(index, event)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                onPaste={handlePaste}
                pattern="[0-9]*"
                type="password"
                value={digit}
              />
            ))}
          </div>

          <div className="project2-lock-status" aria-live="polite">
            {error ? (
              <span className="project2-lock-error">{error}</span>
            ) : (
              <span className="project2-lock-hint">
                <ShieldCheck size={15} strokeWidth={1.8} />
                Access unlocks for this browser session
              </span>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Project2Lock;
