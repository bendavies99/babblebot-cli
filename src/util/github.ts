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

import { Octokit, RestEndpointMethodTypes } from "@octokit/rest";

export interface GithubClient {
    /**
     * Get all the releases for Babblebot for the user to choose a version
     *
     * @returns {Promise<Release[]>} A list of releases
     */
    getReleases: () => Promise<Release[]>;
}

interface Release {
    tagName: string;
    isPrerelease: boolean;
    zipUrl: string;
    tarUrl: string;
}

/**
 * Class to implement GithubClient
 *
 * @author Ben Davies<me@bdavies.net>
 * @since 1.0.0
 */
export default class GithubClientImpl implements GithubClient {
    /**
     * Construct a Github Client
     *
     * @param {OctoKit} restClient The client to connect to github
     */
    constructor(private restClient: Octokit) {}

    /**
     * Map Releases data from Octokit to interface
     *
     * @param {{data: any[]}} releases The releases data to map
     * @returns {Promise<Release[]>} a list of mapped releases
     */
    private async mapReleasesData(
        releases: Promise<
            RestEndpointMethodTypes["repos"]["listReleases"]["response"]
        >,
    ): Promise<Release[]> {
        const data = (await releases).data;
        return data.map((r) => ({
            tagName: r.tag_name,
            isPrerelease: r.prerelease,
            tarUrl: r.tarball_url || "",
            zipUrl: r.zipball_url || "",
        }));
    }

    /**
     * Get all the releases for Babblebot for the user to choose a version
     *
     * @returns {Promise<Release[]>} A list of releases
     */
    public async getReleases(): Promise<Release[]> {
        return this.mapReleasesData(
            this.restClient.repos.listReleases({
                owner: "bendavies99",
                repo: "Babblebot-Server",
            }),
        );
    }
}
