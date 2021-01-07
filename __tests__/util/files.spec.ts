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

import {
    directoryExists,
    retrieveOutputDirectory,
    validatePath,
} from "../../src/util/path";

describe("Path Utilities", () => {
    describe("Retrieve Output Directory", () => {
        it("should output the current working directory plus the relative path", () => {
            const pathValue = retrieveOutputDirectory("babblebot");
            expect(pathValue).toBe(process.cwd() + "/babblebot");
        });

        it("should be same as what is entered", () => {
            const pathString = "C:/Users/Test/babblebot";
            const pathValue = retrieveOutputDirectory(pathString);
            expect(pathValue).toBe(pathString);
        });

        it("should just be babblebot-server added on if '.' is supplied", () => {
            const pathValue = retrieveOutputDirectory(".");
            expect(pathValue).toBe(process.cwd() + "/babblebot-server");
        });

        it("should return 'err' if an invalid folder name is passed", () => {
            const pathValue = retrieveOutputDirectory("Test<");
            expect(pathValue).toBe("err");
        });

        it("should if spaces are added it should return the same back", () => {
            const pathValue = retrieveOutputDirectory(["babblebot", "server"]);
            expect(pathValue).toBe(process.cwd() + "/babblebot server");
        });
    });

    describe("Path Validator", () => {
        it("should fail on <", () => {
            expect(validatePath("Test<")).toBe(false);
        });
        it("should fail on >", () => {
            expect(validatePath("Test>")).toBe(false);
        });
        it("should fail on ?", () => {
            expect(validatePath("Test?")).toBe(false);
        });
        it("should fail on |", () => {
            expect(validatePath("Test|")).toBe(false);
        });
        it("should pass when no invalid characters are passed in", () => {
            expect(validatePath("Test")).toBe(true);
        });
    });

    describe("Directory Exists", () => {
        it("should return false because a directory called 'babblebot' doesn't exist", () => {
            expect(directoryExists("babblebot")).toBe(false);
        });
        it("should return true when __tests__ is passed in", () => {
            expect(directoryExists("__tests__")).toBe(true);
        });
    });
});
