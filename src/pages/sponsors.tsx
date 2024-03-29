import React from "react"
import * as R from "ramda"
import { HeadFC, PageProps } from "gatsby"
import ReactMarkdown from "react-markdown"
import { Layout } from "../components/layout"
import "./sponsors.scss"

type Sponsor = {
    /** used internally as identifier. Has to be unique */
    id: string
    /** the company name as it should appear on the page */
    label?: string
    /** the URL for the link */
    linkTarget: string
    /** a (local) path/URL to the image of the logo (e.g. "/logo_acme.png" */
    logoImgPath?: string

    greetingText?: string

    /** additional CSS applied to the logo to make the logo look ok and to get all logos look equally big */
    logoCss?: React.CSSProperties
}

const sponsors: Record<"gold" | "silver" | "bronze", Array<Sponsor>> = {
    gold: [
        {
            id: "hszg",
            label: "Hochschule Zittau/Görlitz",
            linkTarget: "https://www.hszg.de/",
            logoImgPath: "/logo_hszg.png",
        },
        {
            id: "eno",
            label: "Unbezahlbarland / ENO",
            linkTarget: "https://unbezahlbar.land/",
            logoImgPath: "/logo_ubl.png",
        },
        {
            id: "zeiss",
            label: "ZEISS Digital Innovation",
            linkTarget: "https://www.zeiss.de/digital-innovation",
            logoImgPath: "/logo_zeiss.svg",
            // adjust styling so that the ZEISS logo looks similar in size compared to other logos
            logoCss: {
                maxWidth: "500px",
                maxHeight: "500px",
                height: "200px",
                width: "200px",
            },
            greetingText: `Als Fördermitglied des Digitale Oberlausitz e. V. wünschen wir allen IT-begeisterten Teilnehmenden viel Spaß und einen spannenden Austausch beim diesjährigen Hackathon! Viel Erfolg wünscht euer #teamZEISS.`,
        },
        {
            id: "launix",
            label: "Launix",
            linkTarget: "https://launix.de/",
            logoImgPath: "/logo_launix.png",
        },
    ],
    silver: [
        {
            id: "sednasoft",
            label: "SednaSoft",
            linkTarget: "https://sedna-soft.de/",
            logoImgPath: "/logo_sednasoft.svg",
        },
        {
            id: "innolabs",
            label: "InnoLabs",
            linkTarget: "https://www.innolabs-goerlitz.de",
            logoImgPath: "/logo_innolabs.svg",
        },
        {
            id: "fev",
            label: "FEV etamax GmbH",
            linkTarget: "https://www.etamax.de/",
            logoImgPath: "/logo_fev.png",
        },
    ],
    bronze: [
        {
            id: "tragwerk",
            label: "tragwerk",
            linkTarget: "https://tragwerk-goerlitz.de/",
            logoImgPath: "/logo_tragwerk.jpg",
        },
        {
            id: "tallence",
            label: "Tallence AG",
            linkTarget: "https://www.tallence.com",
            logoImgPath: "/logo_tallence.svg",
        },
    ],
}

const SponsorDetails: React.FC<{ sponsor: Sponsor }> = ({ sponsor }) => (
    <div className="sponsor-details">
        <div className="sponsor-title">
            <a href={sponsor.linkTarget} title={sponsor.label}>
                {sponsor.logoImgPath && (
                    <img style={{ ...sponsor.logoCss }} alt={`Logo ${sponsor.label}`} src={sponsor.logoImgPath} />
                )}
                <p>{sponsor.label}</p>
            </a>
        </div>

        {sponsor.greetingText && (
            <div className="greeting-text">
                <p>{sponsor.greetingText}</p>
            </div>
        )}
    </div>
)

const SponsorsInCategory: React.FC<{ label: string; sponsorsInCategory: Array<Sponsor> }> = ({
    label,
    sponsorsInCategory,
}) => (
    <>
        <h2>{label}</h2>
        {R.sortBy(R.prop("id"), sponsorsInCategory).map((sponsor) => (
            <SponsorDetails key={sponsor.id} sponsor={sponsor} />
        ))}
    </>
)

const SponsorsOverview: React.FC<{ sponsors: Record<"gold" | "silver" | "bronze", Array<Sponsor>> }> = ({
    sponsors,
}) => (
    <div className="sponsor-overview">
        <SponsorsInCategory label="Gold" sponsorsInCategory={sponsors.gold} />
        <SponsorsInCategory label="Silber" sponsorsInCategory={sponsors.silver} />
        <SponsorsInCategory label="Bronze" sponsorsInCategory={sponsors.bronze} />
    </div>
)

const SponsorsPage: React.FC<PageProps> = () => (
    <Layout>
        <ReactMarkdown
            children={`
# Unsere Sponsoren

Wir bedanken uns bei unseren Sponsoren, ohne die der Hackathon so nicht möglich wäre.
Wir glauben, dass ein Hackathon in Görlitz ein Beitrag zur positiven Entwicklung der Region sein kann.
In Görlitz und der Oberlausitz gibt es viele junge und kluge Leute, die ihre Kreativität für
sinnvolle Projekte einsetzen möchten. Ein Hackathon kann ein Ort dafür sein und Technik-Interessierte Menschen
zusammenbringen.
Unsere Sponsoren unterstützen uns aktiv bei der Verwirklichung dieser Vision.
            `}
        />

        <SponsorsOverview sponsors={sponsors} />
    </Layout>
)

export default SponsorsPage
export const Head: HeadFC = () => <title>Unsere Sponsoren</title>
