/** Contact, bank and social details shared by header, footer and pages */

export const ORG_NAME = "Spevácky zbor OMNIA";
export const ORG_EMAIL = "info@omnia.sk";
export const ORG_PHONE = "+421 904 387 243";
export const ORG_ADDRESS_LINE = "Spevácky zbor OMNIA, Gaštanová 3078/4, 010 07 Žilina";
export const ORG_FOUNDED = 2003;

export const BANK_NAME = "Fio banka, a.s.";
export const BANK_ACCOUNT_NUMBER = "2101244230/8330";
export const BANK_BIC = "FIOZSKBA";
export const BANK_IBAN = "SK3483300000002101244230";

export const FACEBOOK_URL = "https://www.facebook.com/omniaslovakia";
export const INSTAGRAM_URL = "https://www.instagram.com/omniaslovakia/";
export const YOUTUBE_URL = "https://www.youtube.com/@OmniaSlovakia/videos";

/** IBAN in groups of four for display, e.g. "SK34 8330 0000 …" */
export function formatIban(iban: string): string {
  return iban.replace(/(.{4})/g, "$1 ").trim();
}
