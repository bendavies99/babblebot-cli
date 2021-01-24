/*MIT License

Copyright (c) 2021 Ben Davies

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import { Octokit } from "@octokit/rest";
import GithubClientImpl from "../../src/util/github";

describe("Github Client", () => {
    it("Should Call Octokit listReleases", () => {
        const mock = {
            repos: { listReleases: jest.fn().mockResolvedValue({ data: [] }) },
        };

        const client = new GithubClientImpl((mock as unknown) as Octokit);
        client.getReleases();
        expect(mock.repos.listReleases).toHaveBeenCalledTimes(1);
    });

    it("should map urls to a blank string", async () => {
        const mock = {
            repos: {
                listReleases: jest.fn().mockResolvedValue({
                    data: [
                        {
                            tag_name: "0.0.1",
                            prerelease: true,
                            tarball_url: "Test",
                            zipball_url: "TestZip",
                        },
                        {
                            tag_name: "0.0.2",
                            prerelease: true,
                            tarball_url: null,
                            zipball_url: null,
                        },
                    ],
                }),
            },
        };

        const client = new GithubClientImpl((mock as unknown) as Octokit);
        const values = await client.getReleases();
        expect(values).toEqual([
            {
                tagName: "0.0.1",
                isPrerelease: true,
                tarUrl: "Test",
                zipUrl: "TestZip",
            },
            {
                tagName: "0.0.2",
                isPrerelease: true,
                tarUrl: "",
                zipUrl: "",
            },
        ]);
    });
});
