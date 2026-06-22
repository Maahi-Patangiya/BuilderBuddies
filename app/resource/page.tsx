"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function PlaceholderPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const legalRef = useRef<HTMLDivElement>(null);
  const medicalRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F5F5F5",
        fontFamily: "'Segoe UI', Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#1A56DB",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            onClick={() => router.push("/dashboard")}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "28px",
            }}
          >
            🏠
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Image
              src="/logo.svg"
              alt="Builder Buddies"
              width={60}
              height={60}
              priority
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h1
                style={{
                  color: "white",
                  margin: 0,
                  fontSize: "22px",
                  fontWeight: 800,
                  lineHeight: 1,
                }}
              >
                Builder
              </h1>
              <h1
                style={{
                  color: "white",
                  margin: 0,
                  fontSize: "22px",
                  fontWeight: 800,
                  lineHeight: 1,
                }}
              >
                Buddies
              </h1>
              <p
                style={{
                  color: "rgba(255,255,255,0.8)",
                  margin: 0,
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                {/* Change this to match the page: "Clinic Map" | "Resources" | "FAQ" */}
                {t("resources.title")} 
                {/* changed from "Resources" to translation key */}
              </p>
            </div>
          </div>
        </div>

        <LanguageSwitcher />
      </div>

      {/* Page Content */}
<div
  style={{
    padding: "32px 24px",
    maxWidth: "900px",
    margin: "0 auto",
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
  <div ref={legalRef}>
    <h2
      style={{
        fontSize: "36px",
        marginBottom: "16px",
      }}
    >
      {t("resources.legal")}
    </h2>

    <h3
      style={{
        fontSize: "24px",
        marginBottom: "12px",
        color: "#1A56DB",
      }}
    >
      Salary Issues
    </h3>

    <p>
      If your salary is delayed, unpaid, or contains deductions that you do not
      understand, help is available. Keep salary slips, bank transfer records,
      employment contracts, and messages exchanged with your employer whenever
      possible.
    </p>

    <h4
      style={{
        marginTop: "24px",
        marginBottom: "16px",
      }}
    >
      Organisations that can help:
    </h4>
    <div
      style={{
        marginBottom: "20px",
      }}
    >
      <a
        href="https://www.mom.gov.sg"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "#2563EB",
          textDecoration: "underline",
          fontWeight: 600,
          fontSize: "18px",
        }}
      >
        Ministry of Manpower (MOM)
      </a>

      <p
        style={{
          marginTop: "6px",
          marginLeft: "12px",
          color: "#444",
          lineHeight: 1.6,
        }}
      >
        • Handles salary claims, employment disputes and work permit matters.
      </p>
    </div>
  </div>

  {/* MEDICAL */}
  <div
    ref={medicalRef}
    style={{
      marginTop: "64px",
    }}
  >
    <h2
      style={{
        fontSize: "36px",
        marginBottom: "16px",
      }}
    >
      {t("resources.medical")}
    </h2>

    <p>
      Most Work Permit holders are covered by employer-provided
      medical insurance. Medical support is also available through
      NGOs and public healthcare providers.
    </p>
  </div>

  {/* SOCIAL */}
  <div
    ref={socialRef}
    style={{
      marginTop: "64px",
      marginBottom: "100px",
    }}
  >
    <h2
      style={{
        fontSize: "36px",
        marginBottom: "16px",
      }}
    >
      {t("resources.social")}
    </h2>

    <p>
      Community organisations provide food support, recreational
      activities, educational opportunities and community events.
    </p>
  </div>
</div>
    </div>
  );
}