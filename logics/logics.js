"use strict";
import { languageCharacters } from "./languageCharacters.js";
export class LanguageDetector {
	found = false;
	#textToDetect;
	#languages = ["English", "Dutch", "French", "Arabic", "Dari", "Pashto"];
	#EnglishCharacters = [];
	#FrenchCharacters = [];
	#DutchCharacters = [];
	#DariCharacters = [];
	#PashtoCharacters = [];
	#ArabicCharacters = [];
	#detectedLanguage;
	message = "";
	constructor(textIn) {
		this.#detectedLanguage = textIn;
	}
	get sendDetectedLanguage() {
		return this.#detectedLanguage;
	}
	set setTextToDetect(text) {
		this.#textToDetect = text;
	}
	detectCharacters(input_array, lanCharArray, detectedCharArray) {
		for (let e = 0; e < input_array.length; e++) {
			for (let j = 0; j < lanCharArray.length; j++) {
				if (input_array[e] === lanCharArray[j]) {
					detectedCharArray.push(lanCharArray[j]);
				}
			}
		}
	}
	detectLan() {
		let input_array = this.#textToDetect.split(" ");
		for (let l = 0; l < this.#languages.length + 1; l++) {
			if (this.#languages[l] === "English") {
				this.detectCharacters(
					input_array,
					languageCharacters.English,
					this.#EnglishCharacters
				);
			}
			if (this.#languages[l] === "French") {
				this.detectCharacters(
					input_array,
					languageCharacters.French,
					this.#FrenchCharacters
				);
			}
			if (this.#languages[l] === "Dutch") {
				this.detectCharacters(
					input_array,
					languageCharacters.Dutch,
					this.#DutchCharacters
				);
			}
			if (this.#languages[l] === "Dari") {
				this.detectCharacters(
					input_array,
					languageCharacters.Dari,
					this.#DariCharacters
				);
			}
			if (this.#languages[l] === "Arabic") {
				this.detectCharacters(
					input_array,
					languageCharacters.Arabic,
					this.#ArabicCharacters
				);
			}
			if (this.#languages[l] === "Pashto") {
				this.detectCharacters(
					input_array,
					languageCharacters.Pashto,
					this.#PashtoCharacters
				);
			}
			if (l === this.#languages.length) {
				let checkArray = [
					this.#EnglishCharacters.length,
					this.#DutchCharacters.length,
					this.#FrenchCharacters.length,
					this.#ArabicCharacters.length,
					this.#DariCharacters.length,
					this.#PashtoCharacters.length,
				];
				let maxOfArr = Math.max.apply(null, checkArray);
				if (maxOfArr > 0) {
					// check for duplicate languages
					let indexOfDuplicates = [];
					for (
						let checkDuplicates = 0;
						checkDuplicates < checkArray.length;
						checkDuplicates++
					) {
						if (checkArray[checkDuplicates] === maxOfArr) {
							indexOfDuplicates.push(checkDuplicates);
						}
					}
					// if there are duplicates
					if (indexOfDuplicates.length > 1 && indexOfDuplicates.length < 3) {
						let languageName =
							this.#languages[indexOfDuplicates[0]] +
							", " +
							this.#languages[indexOfDuplicates[1]] +
							". Common words found in these languages!";
						this.#detectedLanguage = `${languageName}`;
						this.found = true;
						return;
					} else if (
						indexOfDuplicates.length > 2 &&
						indexOfDuplicates.length < 4
					) {
						let languageName =
							this.#languages[indexOfDuplicates[0]] +
							", " +
							this.#languages[indexOfDuplicates[1]] +
							", " +
							this.#languages[indexOfDuplicates[2]] +
							". Common words found in these languages!";
						this.#detectedLanguage = `${languageName}`;
						this.found = true;
						return;
					} else {
						let indexOfMax = checkArray.indexOf(maxOfArr);
						let languageName = this.#languages[indexOfMax];
						this.#detectedLanguage = `${languageName}`;
						this.found = true;
					}
				} else {
					this.message =
						"This app can only detect languages such as English, Dutch, French, Dari, Pashto and Arabic. Sorry that we could detect your favorite language";
				}
			}
		}
	}
}
