/*
 * MIT License
 *
 * Copyright (c) 2021 Ben Davies
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */
/**
 * @file Utility File for path parsing
 * @author Ben Davies <me@bdavies.net>
 * @since 1.0.0
 */

import path from "path";
import {existsSync} from "fs";

/**
 * Convert a supplied directory to a string
 *
 * @param {string | string[]} outputDirSupplied the directory to convert
 * @returns {string} converted string
 */
function convertSuppliedOutputDirectory(outputDirSupplied: string | string[]) {
    return Array.isArray(outputDirSupplied)
        ? outputDirSupplied.join(" ")
        : outputDirSupplied;
}

/**
 * Parse the output directory based on the current directory
 *
 * @param {string | string[]} outputDirSupplied  the directory to parse
 * @returns {string} parsed string
 */
export const retrieveOutputDirectory = (
    outputDirSupplied: string | string[],
): string => {
    const outputDir = convertSuppliedOutputDirectory(outputDirSupplied);
    if (!validatePath(outputDir)) return "err";
    return path.isAbsolute(outputDir)
        ? outputDir
        : process.cwd() +
              "/" +
              (outputDir === "." ? "babblebot-server" : outputDir);
};

/**
 * Validate a path to ensure special characters are not present
 *
 * @param {string} testPath path to test
 * @returns {boolean} true if the path is valid
 */
export const validatePath = (testPath: string): boolean => {
    return !testPath.match(/[<>?|]/);
};

/**
 * Check that a directory exists
 *
 * @param {string} testPath path to test
 * @returns {boolean} true if the directory exists
 */
export const directoryExists = (testPath: string): boolean => {
    return existsSync(testPath);
};
