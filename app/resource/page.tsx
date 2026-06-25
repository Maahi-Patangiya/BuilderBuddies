"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { styles } from "../styles/sharedstyles";

export default function ResourcePage() {
  const router = useRouter();
  const { t } = useTranslation();
  const legalRef = useRef<HTMLDivElement>(null);
  const medicalRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  return (
      <div style={styles.page}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <button style={styles.homeButton} onClick={() => router.push("/dashboard")}>
              🏠
            </button>
            <div style={styles.logoGroup}>
              <Image src="/logo.svg" alt="Builder Buddies" width={60} height={60} priority />
              <div style={styles.titleColumn}>
                <h1 style={styles.titleLine}>Builder Buddies</h1>
                <p style={styles.pageLabel}>{t("resources.title")}</p>
              </div>
            </div>
          </div>
          <LanguageSwitcher />
        </div>
<div
  style={{
    width: "100%",
    maxWidth: "1200px",
    padding: "32px 24px",
    margin: "0 auto",
    boxSizing: "border-box",
  }}
>
  <h1
    style={{
      fontSize: "48px",
      fontWeight: 800,
      marginBottom: "32px",
    }}
  >
    {t("resources.title")}
  </h1>

  {/* Resource Icons */}
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      gap: "24px",
      marginBottom: "48px",
      flexWrap: "wrap",
    }}
  >
    <button
      onClick={() =>
        legalRef.current?.scrollIntoView({ behavior: "smooth" })
      }
      style={{
        border: "none",
        background: "white",
        borderRadius: "24px",
        padding: "20px",
        cursor: "pointer",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Image
        src="/legal.jpeg"
        alt="Legal"
        width={90}
        height={90}
      />

      <div
        style={{
          marginTop: "12px",
          fontWeight: 700,
          fontSize: "20px",
          color: "black",
        }}
      >
        {t("resources.legal")}
      </div>
    </button>

    <button
      onClick={() =>
        medicalRef.current?.scrollIntoView({ behavior: "smooth" })
      }
      style={{
        border: "none",
        background: "white",
        borderRadius: "24px",
        padding: "20px",
        cursor: "pointer",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Image
        src="/medical.jpeg"
        alt="Medical"
        width={90}
        height={90}
      />

      <div
        style={{
          marginTop: "12px",
          fontWeight: 700,
          fontSize: "20px",
          color: "black",
        }}
      >
        {t("resources.medical")}
      </div>
    </button>

    <button
      onClick={() =>
        socialRef.current?.scrollIntoView({ behavior: "smooth" })
      }
      style={{
        border: "none",
        background: "white",
        borderRadius: "24px",
        padding: "20px",
        cursor: "pointer",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Image
        src="/social.jpeg"
        alt="Social"
        width={90}
        height={90}
      />

      <div
        style={{
          marginTop: "12px",
          fontWeight: 700,
          fontSize: "20px",
          color: "black",
        }}
      >
        {t("resources.social")}
      </div>
    </button>
  </div>

  {/* Emergency Contacts */}
  <div
    style={{
      backgroundColor: "white",
      padding: "24px",
      borderRadius: "16px",
      marginBottom: "40px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    }}
  >
    <h2
      style={{
        color: "#1A56DB",
        marginTop: 0,
      }}
    >
      {t("resources.emergency")}
    </h2>

    <p><strong>Police:</strong> 999</p>
    <p><strong>Ambulance / Fire:</strong> 995</p>
    <p><strong>MOM Contact Centre:</strong> 6438 5122</p>
    <p><strong>Migrant Workers' Centre:</strong> 6536 2692</p>
    <p><strong>HOME Helpline:</strong> 1800 797 7000</p>
  </div>

  {/* LEGAL */}
  <div
    ref={legalRef}
    style={{
      width: "100%",
    }}
  >
    <h2 style={{ fontSize: "36px", marginBottom: "24px" }}>
      {t("resources.legal")}
    </h2>

    <h3 style={{ fontSize: "24px", marginBottom: "12px", fontWeight: 700 }}>
      {t("resources.salaryIssues")}
    </h3>

    <ul>
      <li>Employers must pay salary at least once a month.</li>
      <li>Salary should normally be paid within 7 days after the salary period ends.</li>
      <li>Workers should receive itemised payslips.</li>
    </ul>

    <p>
      Official information:{" "}
      <a href="https://www.mom.gov.sg/employment-practices/salary" target="_blank">
        Ministry of Manpower (MOM)
      </a>
    </p>

    <p>
      Need help?{" "}
      <a href="https://www.mwc.org.sg" target="_blank">MWC</a>,{" "}
      <a href="https://www.home.org.sg" target="_blank">HOME</a>,{" "}
      <a href="https://twc2.org.sg" target="_blank">TWC2</a>
    </p>

    <h3 style={{ fontSize: "24px", marginTop: "32px", marginBottom: "12px", fontWeight: 700 }}>
      {t("resources.leaveDays")}
    </h3>

    <ul>
      <li>Workers are entitled to rest days.</li>
      <li>Annual leave entitlement increases with length of service.</li>
      <li>Medical leave may be granted when certified by a doctor.</li>
    </ul>

    <p>
      Official information:{" "}
      <a href="https://www.mom.gov.sg/employment-practices/leave" target="_blank">
        MOM Leave Entitlements
      </a>
    </p>

    <h3 style={{ fontSize: "24px", marginTop: "32px", marginBottom: "12px", fontWeight: 700 }}>
      {t("resources.wica")}
    </h3>

    <ul>
      <li>Workers injured at work may be entitled to compensation.</li>
      <li>Medical expenses may be claimable.</li>
      <li>Keep all medical reports and receipts.</li>
    </ul>

    <p>
      Official information:{" "}
      <a href="https://www.mom.gov.sg/workplace-safety-and-health/work-injury-compensation" target="_blank">
        MOM WICA Guide
      </a>
    </p>

    <p>
      Need help?{" "}
      <a href="https://www.home.org.sg" target="_blank">HOME</a>,{" "}
      <a href="https://www.mwc.org.sg" target="_blank">MWC</a>,{" "}
      <a href="https://www.healthserve.org.sg" target="_blank">HealthServe</a>
    </p>
  </div>

  {/* MEDICAL */}
  <div ref={medicalRef} style={{ marginTop: "64px" }}>
    <h2 style={{ fontSize: "36px", marginBottom: "24px" }}>
      {t("resources.medical")}
    </h2>

    <h3 style={{ fontSize: "24px", marginBottom: "12px", fontWeight: 700 }}>
      {t("resources.medicalInsurance")}
    </h3>

    <ul>
      <li>Employers are required to provide medical insurance for Work Permit holders.</li>
      <li>Workers should be able to access necessary medical treatment.</li>
    </ul>

    <p>
      Official information:{" "}
      <a href="https://www.mom.gov.sg/passes-and-permits/work-permit-for-foreign-worker/sector-specific-rules/medical-insurance" target="_blank">
        MOM Medical Insurance Requirements
      </a>
    </p>

    <h3 style={{ fontSize: "24px", marginTop: "32px", marginBottom: "12px", fontWeight: 700 }}>
      {t("resources.workplaceInjuries")}
    </h3>

    <ul>
      <li>Seek medical attention immediately after an injury.</li>
      <li>Keep medical reports and receipts.</li>
      <li>Inform relevant support organisations if assistance is needed.</li>
    </ul>

    <h3 style={{ fontSize: "24px", marginTop: "32px", marginBottom: "12px", fontWeight: 700 }}>
      {t("resources.heatStress")}
    </h3>

    <ul>
      <li>Drink water regularly.</li>
      <li>Seek help if you feel dizzy, faint or unwell.</li>
      <li>Take rest breaks when required.</li>
    </ul>

    <h3 style={{ fontSize: "24px", marginTop: "32px", marginBottom: "12px", fontWeight: 700 }}>
      {t("resources.mentalHealth")}
    </h3>

    <ul>
      <li>Stress, loneliness and homesickness are common.</li>
      <li>Counselling and support services are available.</li>
    </ul>

    <p>
      Support available through{" "}
      <a href="https://www.healthserve.org.sg" target="_blank">HealthServe</a>{" "}
      and{" "}
      <a href="https://www.home.org.sg" target="_blank">HOME</a>.
    </p>
  </div>

  {/* SOCIAL */}
  <div ref={socialRef} style={{ marginTop: "64px", marginBottom: "100px" }}>
    <h2 style={{ fontSize: "36px", marginBottom: "24px" }}>
      {t("resources.social")}
    </h2>

    <h3 style={{ fontSize: "24px", marginBottom: "12px", fontWeight: 700 }}>
      {t("resources.foodSupport")}
    </h3>

    <p>
      Food support may be available through community organisations and religious groups.
    </p>

    <p>
      <a href="https://www.hkm.sg" target="_blank">
        Krishna's Free Meal Programme
      </a>
    </p>

    <h3 style={{ fontSize: "24px", marginTop: "32px", marginBottom: "12px", fontWeight: 700 }}>
      {t("resources.communityActivities")}
    </h3>

    <p>
      Community events, sports activities and outreach programmes help workers stay connected.
    </p>

    <p>
      <a href="https://www.itsrainingraincoats.com" target="_blank">
        It's Raining Raincoats (IRR)
      </a>
    </p>

    <h3 style={{ fontSize: "24px", marginTop: "32px", marginBottom: "12px", fontWeight: 700 }}>
      {t("resources.learning")}
    </h3>

    <p>
      NGOs may offer English classes, digital literacy programmes and financial literacy workshops.
    </p>

    <p>
      Organisations involved include{" "}
      <a href="https://www.healthserve.org.sg" target="_blank">HealthServe</a>,{" "}
      <a href="https://www.mwc.org.sg" target="_blank">MWC</a>,{" "}
      <a href="https://www.home.org.sg" target="_blank">HOME</a>, and{" "}
      <a href="https://www.itsrainingraincoats.com" target="_blank">IRR</a>.
    </p>
  </div>

</div>
    </div>
  );
}