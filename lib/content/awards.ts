/** Awards list — newest first. Texts live in i18n under award.aN.* */

export type Award = {
  year: string;
  competitionKey: string;
  locationKey: string;
  badgeKeys: string[];
  /** Special / jury / conductor prizes — separate lines below badges */
  specialPrizeKeys?: string[];
  /** Shown on the homepage and as a large block on the awards timeline */
  highlight?: boolean;
};

export const awards: Award[] = [
  {
    year: "2026",
    highlight: true,
    competitionKey: "award.a22.competition",
    locationKey: "award.a22.location",
    badgeKeys: ["award.a22.b1", "award.a22.b2"],
  },
  {
    year: "2025",
    highlight: true,
    competitionKey: "award.a1.competition",
    locationKey: "award.a1.location",
    badgeKeys: ["award.a1.b1", "award.a1.b2"],
    specialPrizeKeys: ["award.a1.s1", "award.a1.s2"],
  },
  {
    year: "2024",
    competitionKey: "award.a2.competition",
    locationKey: "award.a2.location",
    badgeKeys: ["award.a2.b1", "award.a2.b2", "award.a2.b3"],
    specialPrizeKeys: ["award.a2.s1", "award.a2.s2", "award.a2.s3"],
  },
  {
    year: "2024",
    competitionKey: "award.a3.competition",
    locationKey: "award.a3.location",
    badgeKeys: ["award.a3.b1", "award.a3.b2"],
    specialPrizeKeys: ["award.a3.s1"],
  },
  {
    year: "2023",
    highlight: true,
    competitionKey: "award.a4.competition",
    locationKey: "award.a4.location",
    badgeKeys: ["award.a4.b1", "award.a4.b2"],
  },
  {
    year: "2022",
    competitionKey: "award.a5.competition",
    locationKey: "award.a5.location",
    badgeKeys: ["award.a5.b1"],
  },
  {
    year: "2018",
    competitionKey: "award.a6.competition",
    locationKey: "award.a6.location",
    badgeKeys: ["award.a6.b1", "award.a6.b2"],
  },
  {
    year: "2018",
    competitionKey: "award.a7.competition",
    locationKey: "award.a7.location",
    badgeKeys: ["award.a7.b1", "award.a7.b2", "award.a7.b3"],
    specialPrizeKeys: ["award.a7.s1", "award.a7.s2"],
  },
  {
    year: "2016",
    competitionKey: "award.a8.competition",
    locationKey: "award.a8.location",
    badgeKeys: ["award.a8.b1"],
  },
  {
    year: "2016",
    competitionKey: "award.a9.competition",
    locationKey: "award.a9.location",
    badgeKeys: ["award.a9.b1"],
    specialPrizeKeys: ["award.a9.s1"],
  },
  {
    year: "2015",
    competitionKey: "award.a10.competition",
    locationKey: "award.a10.location",
    badgeKeys: ["award.a10.b1"],
  },
  {
    year: "2014",
    competitionKey: "award.a11.competition",
    locationKey: "award.a11.location",
    badgeKeys: ["award.a11.b1"],
  },
  {
    year: "2013",
    competitionKey: "award.a12.competition",
    locationKey: "award.a12.location",
    badgeKeys: ["award.a12.b1"],
    specialPrizeKeys: ["award.a12.s1"],
  },
  {
    year: "2012",
    competitionKey: "award.a13.competition",
    locationKey: "award.a13.location",
    badgeKeys: ["award.a13.b1"],
    specialPrizeKeys: ["award.a13.s1"],
  },
  {
    year: "2012",
    competitionKey: "award.a14.competition",
    locationKey: "award.a14.location",
    badgeKeys: ["award.a14.b1"],
    specialPrizeKeys: ["award.a14.s1", "award.a14.s2"],
  },
  {
    year: "2010",
    competitionKey: "award.a15.competition",
    locationKey: "award.a15.location",
    badgeKeys: ["award.a15.b1"],
  },
  {
    year: "2009",
    competitionKey: "award.a16.competition",
    locationKey: "award.a16.location",
    badgeKeys: ["award.a16.b1"],
    specialPrizeKeys: ["award.a16.s1"],
  },
  {
    year: "2007",
    competitionKey: "award.a17.competition",
    locationKey: "award.a17.location",
    badgeKeys: ["award.a17.b1"],
    specialPrizeKeys: ["award.a17.s1"],
  },
  {
    year: "2006",
    competitionKey: "award.a18.competition",
    locationKey: "award.a18.location",
    badgeKeys: ["award.a18.b1"],
  },
  {
    year: "2005",
    competitionKey: "award.a19.competition",
    locationKey: "award.a19.location",
    badgeKeys: ["award.a19.b1"],
    specialPrizeKeys: ["award.a19.s1"],
  },
  {
    year: "2004",
    competitionKey: "award.a20.competition",
    locationKey: "award.a20.location",
    badgeKeys: ["award.a20.b1"],
  },
  {
    year: "2003",
    competitionKey: "award.a21.competition",
    locationKey: "award.a21.location",
    badgeKeys: ["award.a21.b1"],
    specialPrizeKeys: ["award.a21.s1", "award.a21.s2"],
  },
];

export const highlightedAwards = awards.filter((a) => a.highlight);
