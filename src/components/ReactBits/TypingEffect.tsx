"use client";

import { useEffect, useState } from "react";

interface TypingEffectProps {
	words: string[];
	className?: string;
	typingSpeed?: number;
	deletingSpeed?: number;
	pauseDuration?: number;
}

export function TypingEffect({
	words,
	className = "",
	typingSpeed = 100,
	deletingSpeed = 50,
	pauseDuration = 2000,
}: TypingEffectProps) {
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [currentText, setCurrentText] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		const currentWord = words[currentWordIndex];

		const timeout = setTimeout(
			() => {
				if (!isDeleting) {
					// Typing
					if (currentText.length < currentWord.length) {
						setCurrentText(currentWord.slice(0, currentText.length + 1));
					} else {
						// Pause before deleting
						setTimeout(() => setIsDeleting(true), pauseDuration);
					}
				} else {
					// Deleting
					if (currentText.length > 0) {
						setCurrentText(currentWord.slice(0, currentText.length - 1));
					} else {
						// Move to next word
						setIsDeleting(false);
						setCurrentWordIndex((prev) => (prev + 1) % words.length);
					}
				}
			},
			isDeleting ? deletingSpeed : typingSpeed,
		);

		return () => clearTimeout(timeout);
	}, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

	return (
		<span className={className}>
			{currentText}
			<span className="animate-pulse">|</span>
		</span>
	);
}
