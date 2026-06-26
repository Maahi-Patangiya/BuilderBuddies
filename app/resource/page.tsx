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

    <h3 style={{ fontSize: "24px", marginTop: "20px", marginBottom: "8px", fontWeight: 700 }}>
      {t("resources.salaryIssues")}
    </h3>

    <p>
      It can be worrying if your salary is late, lower than expected, or if deductions are made without a clear explanation. In Singapore, employers are generally required to pay salaries at least once a month, and salary should usually be paid within 7 days after the end of the salary period. You should also receive an itemised payslip showing how your salary was calculated. If you believe your salary has been withheld unfairly, keep copies of your employment contract, salary slips, bank transfer records and any messages exchanged with your employer, as these may help support your case.</p>
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

    <h3 style={{ fontSize: "24px", marginTop: "20px", marginBottom: "8px", fontWeight: 700 }}>
      {t("resources.leaveDays")}
    </h3>

    <p> Taking adequate rest is important for both your health and your safety at work. Work Permit holders are entitled to rest days under Singapore's employment regulations, and many workers are also entitled to annual leave depending on how long they have worked for their employer. If you are unwell, you may also be entitled to paid sick leave when certified by a registered doctor. If you are unsure whether your employer is providing the correct leave benefits, you can check the official Ministry of Manpower guidelines or seek advice from migrant worker support organisations.</p>

    <p>
      Official information:{" "}
      <a href="https://www.mom.gov.sg/employment-practices/leave" target="_blank">
        MOM Leave Entitlements
      </a>
    </p>

    <h3 style={{ fontSize: "24px", marginTop: "20px", marginBottom: "8px", fontWeight: 700 }}>
      {t("resources.wica")}
    </h3>

   <p>
    If you are injured while carrying out your work, you may be protected under Singapore's Work Injury Compensation Act (WICA). This scheme allows eligible employees to claim compensation for workplace injuries or occupational diseases without having to file a lawsuit. Report your injury as soon as possible, seek medical attention immediately, and keep all medical reports, receipts and hospital documents. If you are worried about losing your job or being sent home after reporting an injury, remember that several organisations can provide confidential advice and explain the options available to you before you make any decisions.
   </p>

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

    <h3 style={{ fontSize: "24px", marginTop: "20px", marginBottom: "8px", fontWeight: 700 }}>
      {t("resources.medicalInsurance")}
    </h3>

    <p> Many migrant workers worry about the cost of seeking medical care or whether they are allowed to visit a doctor. Under Singapore's regulations, employers are required to purchase medical insurance for Work Permit holders and remain responsible for ensuring that workers receive necessary medical treatment for illnesses and injuries. If you are unsure about your medical coverage or have been discouraged from seeking treatment, you can refer to the Ministry of Manpower's official guidance or seek advice from organisations that support migrant workers.</p>

    <p>
      Official information:{" "}
      <a href="https://www.mom.gov.sg/passes-and-permits/work-permit-for-foreign-worker/sector-specific-rules/medical-insurance" target="_blank">
        MOM Medical Insurance Requirements
      </a>
    </p>

    <p>
      Need help?{" "}
        <a href="https://healthserve.org.sg/" target="_blank">Healthserve</a>,{" "}
        <a href="https://www.home.org.sg" target="_blank">HOME</a>,{" "}
        <a href="https://www.mom.gov.sg/passes-and-permits/work-permit-for-foreign-worker/sector-specific-rules/medical-insurance" target="_blank">
          Ministry of Manpower (MOM)
        </a>
    </p>

    <h3 style={{ fontSize: "24px", marginTop: "20px", marginBottom: "8px", fontWeight: 700 }}>
      {t("resources.workplaceInjuries")}
    </h3>

    <p>
      Construction and manual labour involve physical risks, and no worker should feel pressured to continue working when seriously injured. If you are involved in a workplace accident, seek medical attention as soon as possible and keep all medical reports, receipts and follow-up documents. If you believe unsafe working conditions, faulty equipment or inadequate safety measures contributed to your injury, you may wish to document what happened and seek advice before signing any documents or accepting compensation. Support organisations can help you understand your rights and available options.
    </p>

    <h3 style={{ fontSize: "24px", marginTop: "20px", marginBottom: "8px", fontWeight: 700 }}>
      {t("resources.heatStress")}
    </h3>

    <p>Construction workers often spend long hours outdoors, making heat stress and dehydration a serious health risk. Symptoms such as dizziness, headaches, muscle cramps, excessive sweating or fainting should never be ignored. Drink water regularly throughout the day, rest whenever possible and seek medical attention if symptoms become severe. If you believe your working conditions are placing your health at risk, support organisations can provide advice and direct you to appropriate services.</p>

    <h3 style={{ fontSize: "24px", marginTop: "20px", marginBottom: "8px", fontWeight: 700 }}>
      {t("resources.mentalHealth")}
    </h3>

    
    <p>Living away from family, adapting to a new country and managing financial responsibilities can place significant emotional stress on migrant workers. Feelings of loneliness, anxiety, homesickness or exhaustion are common, and seeking help is a sign of strength rather than weakness. If work-related stress, isolation or personal difficulties are affecting your wellbeing, confidential counselling and community support services are available. You do not have to face these challenges alone.</p>

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

    <h3 style={{ fontSize: "24px", marginTop: "20px", marginBottom: "8px", fontWeight: 700 }}>
      {t("resources.foodSupport")}
    </h3>

    <p>
      No one should have to worry about where their next meal will come from. If you are experiencing financial difficulties, recovering from an injury or temporarily unable to work, several community organisations and charities provide food assistance to migrant workers. Depending on your circumstances, support may include cooked meals, food vouchers or grocery assistance. If you are unsure whether you are eligible, do not hesitate to contact a support organisation for advice.
    </p>

    <p>
      <a href="https://www.hkm.sg" target="_blank">
        Krishna's Free Meal Programme
      </a>
    </p>

    <h3 style={{ fontSize: "24px", marginTop: "20px", marginBottom: "8px", fontWeight: 700 }}>
      {t("resources.communityActivities")}
    </h3>

    <p>
      Adjusting to life in a new country can be challenging, particularly when you are far from family and friends. Many organisations organise recreational activities, sports events, festive celebrations and volunteer programmes that allow migrant workers to relax, meet new people and build friendships outside of work. Staying socially connected can improve both physical and mental wellbeing while helping you become more familiar with life in Singapore.
    </p>

    <p>
      <a href="https://www.itsrainingraincoats.com" target="_blank">
        It's Raining Raincoats (IRR)
      </a>
    </p>

    <h3 style={{ fontSize: "24px", marginTop: "20px", marginBottom: "8px", fontWeight: 700 }}>
      {t("resources.learning")}
    </h3>

    <p>
      Many migrant workers choose to develop new skills during their time in Singapore. Community organisations regularly offer free or affordable English classes, digital literacy courses, financial literacy workshops and other educational programmes designed to improve everyday communication, workplace confidence and future career opportunities. Learning new skills can also make it easier to access services, understand your employment rights and stay connected with family back home.
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