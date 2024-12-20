import { PassportStrategy } from "@nestjs/passport"
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'google-redirect',
            scope: ['email', 'profile']
        })
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<any> {
        const { emails, photos } = profile;
        const firstValidEmail = emails.find((email) => email.verified);

        if (!firstValidEmail) {
            done(new Error('No valid email found'), null);
            return;
        }

        const defaultProfile = photos[0].value

        const user = {
            name: profile.displayName,
            email: firstValidEmail.value,
            profile_url: defaultProfile,
            token: accessToken,
            refreshToken,
        };

        done(null, user);
    }
}