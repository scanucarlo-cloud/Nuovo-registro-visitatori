import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Card as SignatureCard } from "@/components/ui/card";
import { Users, Truck, Building2, Globe, QrCode, Mail, Download, ShieldCheck, Search, ArrowLeft, Siren, ClipboardCheck, Image as ImageIcon, Palette, Eraser } from "lucide-react";

const initialVisits = [
  {
    id: 1,
    name: "Mario Rossi",
    company: "Trasporti Nord",
    plate: "AB123CD",
    trailerPlate: "XZ987TT",
    host: "Luca Bianchi",
    reason: "Scarico materiale",
    type: "Autista",
    status: "Presente",
    site: "Sede Centrale",
    checkIn: "08:12",
    checkOut: "",
    language: "IT",
    qrCode: "QR-0001",
    entrySignature: "Mario Rossi",
    exitSignature: "",
    emergencyChecked: false,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    company: "Global Coatings",
    plate: "",
    trailerPlate: "",
    host: "Giulia Conti",
    reason: "Riunione commerciale",
    type: "Visitatore",
    status: "Presente",
    site: "Sede Centrale",
    checkIn: "09:03",
    checkOut: "",
    language: "EN",
    qrCode: "QR-0002",
    entrySignature: "Sarah Johnson",
    exitSignature: "",
    emergencyChecked: false,
  },
  {
    id: 3,
    name: "Ahmed Karim",
    company: "Service Plant",
    plate: "EF456GH",
    trailerPlate: "LM222OP",
    host: "Marco Villa",
    reason: "Manutenzione impianto",
    type: "Fornitore",
    status: "Uscito",
    site: "Magazzino 2",
    checkIn: "07:40",
    checkOut: "11:10",
    language: "IT",
    qrCode: "QR-0003",
    entrySignature: "Ahmed Karim",
    exitSignature: "Ahmed Karim",
    emergencyChecked: false,
  },
];

const hosts = ["Luca Bianchi", "Giulia Conti", "Marco Villa", "Reception", "Produzione"];
const sites = ["Sede Centrale", "Magazzino 2", "Stabilimento B"];
const languages = [
  { code: "IT", label: "Italiano" },
  { code: "EN", label: "English" },
  { code: "FR", label: "Français" },
  { code: "DE", label: "Deutsch" },
];

const translations = {
  IT: {
    selectOperation: "Seleziona operazione",
    simpleImmediate: "Schermata dedicata al visitatore, semplice e immediata.",
    language: "Lingua",
    enter: "Entra",
    exit: "Esci",
    visitorRegistration: "Registrazione visitatore",
    tabletDescription: "Interfaccia semplificata per utilizzo su tablet all’ingresso.",
    back: "Indietro",
    accessType: "Tipologia accesso",
    visitor: "Visitatore",
    driver: "Autista",
    supplier: "Fornitore",
    maintenance: "Manutentore",
    fullName: "Nome e cognome",
    company: "Azienda",
    vehiclePlate: "Targa mezzo",
    trailerPlate: "Targa rimorchio",
    site: "Sede",
    host: "Referente interno",
    reason: "Motivo visita",
    enterName: "Inserisci nominativo",
    companyName: "Nome azienda",
    optional: "Facoltativo",
    selectHost: "Seleziona referente",
    reasonPlaceholder: "Es. riunione, scarico, manutenzione",
    privacy: "Ho preso visione dell’informativa privacy",
    safety: "Ho preso visione delle istruzioni di sicurezza",
    notifyHost: "Invia notifica email al referente",
    confirmCheckin: "Conferma check-in",
    generateQr: "Genera badge QR",
    checkoutTitle: "Check-out rapido",
    checkoutDescription: "Ricerca visitatori presenti e registra l’uscita in modo immediato.",
    searchCheckout: "Cerca nominativo, azienda, targa o rimorchio",
    searchCheckoutPlaceholder: "Inserisci i dati per trovare il visitatore",
    noResults: "Nessun visitatore presente corrisponde alla ricerca.",
    confirmExit: "Conferma uscita",
    qrTitle: "Scansione QR",
    qrDescription: "Simulazione di check-out tramite badge QR.",
    qrCodeLabel: "Codice QR badge",
    qrCodePlaceholder: "Es. QR-0001",
    registerExitQr: "Registra uscita con QR",
    entrySignature: "Firma in ingresso",
    exitSignature: "Firma in uscita",
    signaturePlaceholder: "Firma digitale o nominativo",
    emergencyMode: "Modalità emergenza",
    emergencyDescription: "Elenco in tempo reale dei visitatori presenti da usare durante l’appello.",
    emergencyPresent: "Presenti nello stabilimento",
    emergencyChecked: "Appello eseguito",
    markPresent: "Spunta presenza",
    clearRollCall: "Azzera appello",
    searchEmergency: "Cerca nell’elenco emergenza",
    searchEmergencyPlaceholder: "Nome, azienda, targa o referente",
    noEmergencyResults: "Nessun visitatore presente da visualizzare.",
    checkedStatus: "Verificato",
    pendingStatus: "Da verificare",
  },
  EN: {
    selectOperation: "Select operation",
    simpleImmediate: "Dedicated visitor screen, simple and immediate.",
    language: "Language",
    enter: "Enter",
    exit: "Exit",
    visitorRegistration: "Visitor registration",
    tabletDescription: "Simplified interface for tablet use at reception.",
    back: "Back",
    accessType: "Access type",
    visitor: "Visitor",
    driver: "Driver",
    supplier: "Supplier",
    maintenance: "Maintenance",
    fullName: "Full name",
    company: "Company",
    vehiclePlate: "Vehicle plate",
    trailerPlate: "Trailer plate",
    site: "Site",
    host: "Internal host",
    reason: "Reason for visit",
    enterName: "Enter full name",
    companyName: "Company name",
    optional: "Optional",
    selectHost: "Select host",
    reasonPlaceholder: "E.g. meeting, delivery, maintenance",
    privacy: "I have read the privacy notice",
    safety: "I have read the safety instructions",
    notifyHost: "Send email notification to host",
    confirmCheckin: "Confirm check-in",
    generateQr: "Generate QR badge",
    checkoutTitle: "Quick check-out",
    checkoutDescription: "Search active visitors and register their exit immediately.",
    searchCheckout: "Search by name, company, plate or trailer",
    searchCheckoutPlaceholder: "Enter data to find the visitor",
    noResults: "No active visitor matches your search.",
    confirmExit: "Confirm exit",
    qrTitle: "QR scan",
    qrDescription: "Simulated check-out via QR badge.",
    qrCodeLabel: "QR badge code",
    qrCodePlaceholder: "E.g. QR-0001",
    registerExitQr: "Register exit with QR",
    entrySignature: "Entry signature",
    exitSignature: "Exit signature",
    signaturePlaceholder: "Digital signature or typed name",
    emergencyMode: "Emergency mode",
    emergencyDescription: "Real-time list of visitors on site for roll call.",
    emergencyPresent: "Currently on site",
    emergencyChecked: "Roll call completed",
    markPresent: "Mark present",
    clearRollCall: "Reset roll call",
    searchEmergency: "Search emergency list",
    searchEmergencyPlaceholder: "Name, company, plate or host",
    noEmergencyResults: "No active visitors to display.",
    checkedStatus: "Checked",
    pendingStatus: "Pending",
  },
  FR: {
    selectOperation: "Sélectionner l’opération",
    simpleImmediate: "Écran dédié au visiteur, simple et immédiat.",
    language: "Langue",
    enter: "Entrer",
    exit: "Sortir",
    visitorRegistration: "Enregistrement du visiteur",
    tabletDescription: "Interface simplifiée pour une utilisation sur tablette à l’accueil.",
    back: "Retour",
    accessType: "Type d’accès",
    visitor: "Visiteur",
    driver: "Chauffeur",
    supplier: "Fournisseur",
    maintenance: "Maintenance",
    fullName: "Nom et prénom",
    company: "Entreprise",
    vehiclePlate: "Plaque véhicule",
    trailerPlate: "Plaque remorque",
    site: "Site",
    host: "Référent interne",
    reason: "Motif de la visite",
    enterName: "Saisir le nom",
    companyName: "Nom de l’entreprise",
    optional: "Facultatif",
    selectHost: "Sélectionner le référent",
    reasonPlaceholder: "Ex. réunion, livraison, maintenance",
    privacy: "J’ai pris connaissance de la note d’information sur la confidentialité",
    safety: "J’ai pris connaissance des consignes de sécurité",
    notifyHost: "Envoyer une notification e-mail au référent",
    confirmCheckin: "Confirmer l’enregistrement",
    generateQr: "Générer badge QR",
    checkoutTitle: "Sortie rapide",
    checkoutDescription: "Recherchez les visiteurs présents et enregistrez leur sortie immédiatement.",
    searchCheckout: "Rechercher par nom, entreprise, plaque ou remorque",
    searchCheckoutPlaceholder: "Saisissez les données pour trouver le visiteur",
    noResults: "Aucun visiteur présent ne correspond à la recherche.",
    confirmExit: "Confirmer la sortie",
    qrTitle: "Scan QR",
    qrDescription: "Simulation de sortie via badge QR.",
    qrCodeLabel: "Code badge QR",
    qrCodePlaceholder: "Ex. QR-0001",
    registerExitQr: "Enregistrer la sortie avec QR",
    entrySignature: "Signature d’entrée",
    exitSignature: "Signature de sortie",
    signaturePlaceholder: "Signature numérique ou nom saisi",
    emergencyMode: "Mode urgence",
    emergencyDescription: "Liste en temps réel des visiteurs présents pour l’appel.",
    emergencyPresent: "Présents sur site",
    emergencyChecked: "Appel effectué",
    markPresent: "Cocher présence",
    clearRollCall: "Réinitialiser l’appel",
    searchEmergency: "Rechercher dans la liste d’urgence",
    searchEmergencyPlaceholder: "Nom, entreprise, plaque ou référent",
    noEmergencyResults: "Aucun visiteur présent à afficher.",
    checkedStatus: "Vérifié",
    pendingStatus: "À vérifier",
  },
  DE: {
    selectOperation: "Vorgang auswählen",
    simpleImmediate: "Spezieller Besucherbildschirm, einfach und direkt.",
    language: "Sprache",
    enter: "Eintreten",
    exit: "Ausgehen",
    visitorRegistration: "Besucherregistrierung",
    tabletDescription: "Vereinfachte Oberfläche für die Tablet-Nutzung am Empfang.",
    back: "Zurück",
    accessType: "Zugangsart",
    visitor: "Besucher",
    driver: "Fahrer",
    supplier: "Lieferant",
    maintenance: "Wartung",
    fullName: "Vor- und Nachname",
    company: "Firma",
    vehiclePlate: "Kennzeichen Fahrzeug",
    trailerPlate: "Kennzeichen Anhänger",
    site: "Standort",
    host: "Interner Ansprechpartner",
    reason: "Besuchsgrund",
    enterName: "Namen eingeben",
    companyName: "Firmenname",
    optional: "Optional",
    selectHost: "Ansprechpartner wählen",
    reasonPlaceholder: "Z. B. Meeting, Lieferung, Wartung",
    privacy: "Ich habe die Datenschutzhinweise gelesen",
    safety: "Ich habe die Sicherheitshinweise gelesen",
    notifyHost: "E-Mail-Benachrichtigung an Ansprechpartner senden",
    confirmCheckin: "Check-in bestätigen",
    generateQr: "QR-Badge erzeugen",
    checkoutTitle: "Schneller Check-out",
    checkoutDescription: "Aktive Besucher suchen und den Ausgang sofort registrieren.",
    searchCheckout: "Nach Name, Firma, Kennzeichen oder Anhänger suchen",
    searchCheckoutPlaceholder: "Daten eingeben, um Besucher zu finden",
    noResults: "Kein anwesender Besucher entspricht der Suche.",
    confirmExit: "Ausgang bestätigen",
    qrTitle: "QR-Scan",
    qrDescription: "Simulierter Check-out per QR-Badge.",
    qrCodeLabel: "QR-Badge-Code",
    qrCodePlaceholder: "Z. B. QR-0001",
    registerExitQr: "Ausgang mit QR registrieren",
    entrySignature: "Unterschrift beim Eintritt",
    exitSignature: "Unterschrift beim Austritt",
    signaturePlaceholder: "Digitale Unterschrift oder eingegebener Name",
    emergencyMode: "Notfallmodus",
    emergencyDescription: "Echtzeitliste aller anwesenden Besucher für den Sammelappell.",
    emergencyPresent: "Derzeit im Werk",
    emergencyChecked: "Appell durchgeführt",
    markPresent: "Anwesenheit markieren",
    clearRollCall: "Appell zurücksetzen",
    searchEmergency: "Notfallliste durchsuchen",
    searchEmergencyPlaceholder: "Name, Firma, Kennzeichen oder Ansprechpartner",
    noEmergencyResults: "Keine anwesenden Besucher zur Anzeige.",
    checkedStatus: "Geprüft",
    pendingStatus: "Offen",
  },
};

const defaultFieldSettings = [
  { id: "name", label: "Nome e cognome", required: true, visible: true },
  { id: "company", label: "Azienda", required: true, visible: true },
  { id: "plate", label: "Targa mezzo", required: false, visible: true },
  { id: "trailerPlate", label: "Targa rimorchio", required: false, visible: true },
  { id: "site", label: "Sede", required: true, visible: true },
  { id: "host", label: "Referente interno", required: true, visible: true },
  { id: "reason", label: "Motivo visita", required: true, visible: true },
  { id: "privacy", label: "Consenso privacy", required: true, visible: true },
  { id: "safety", label: "Presa visione sicurezza", required: false, visible: true },
  { id: "entrySignature", label: "Firma in ingresso", required: true, visible: true },
  { id: "exitSignature", label: "Firma in uscita", required: true, visible: true },
];

const backgroundPresets = [
  {
    id: "soft",
    label: "Chiaro aziendale",
    value: "linear-gradient(135deg, rgba(248,250,252,0.96), rgba(226,232,240,0.92))",
  },
  {
    id: "blue",
    label: "Blu corporate",
    value: "linear-gradient(135deg, rgba(219,234,254,0.94), rgba(191,219,254,0.90), rgba(224,242,254,0.92))",
  },
  {
    id: "dark",
    label: "Scuro elegante",
    value: "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.94), rgba(51,65,85,0.92))",
  },
];

const defaultBranding = {
  companyName: "Azienda demo",
  logoUrl: "",
  appBackgroundUrl: "",
  loginBackgroundUrl: "",
  selectedPreset: "soft",
  overlayOpacity: 0.72,
  cardOpacity: 0.9,
};

function StatCard({ title, value, icon: Icon, subtitle, cardStyle }) {
  return (
    <Card className="rounded-2xl shadow-sm" style={cardStyle}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
          </div>
          <div className="rounded-2xl border p-3">
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }) {
  const variant = status === "Presente" ? "default" : "secondary";
  return <Badge variant={variant}>{status}</Badge>;
}

function SignatureBox({ label, value, onChange, placeholder }) {
  return (
    <SignatureCard className="rounded-2xl border-dashed bg-background/90">
      <CardContent className="p-4 space-y-2">
        <Label>{label}</Label>
        <div className="min-h-24 rounded-xl border bg-background p-3">
          <Input value={value} onChange={onChange} placeholder={placeholder} className="border-0 shadow-none px-0" />
          <p className="mt-3 text-xs text-muted-foreground">Nel prototipo la firma è simulata con testo. In produzione può essere sostituita con firma grafometrica su touch screen.</p>
        </div>
      </CardContent>
    </SignatureCard>
  );
}

export default function VisitorRegistryPrototype() {
  const [visits, setVisits] = useState(initialVisits);
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("IT");
  const t = translations[language] || translations.IT;
  const [activeTab, setActiveTab] = useState("access");
  const [accessMode, setAccessMode] = useState(null);
  const [checkoutQuery, setCheckoutQuery] = useState("");
  const [qrSearch, setQrSearch] = useState("");
  const [emergencySearch, setEmergencySearch] = useState("");
  const [fieldSettings, setFieldSettings] = useState(defaultFieldSettings);
  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [branding, setBranding] = useState(defaultBranding);
  const [form, setForm] = useState({
    name: "",
    company: "",
    plate: "",
    trailerPlate: "",
    host: "",
    reason: "",
    type: "Visitatore",
    site: "Sede Centrale",
    emailNotify: true,
    privacy: false,
    safety: false,
    entrySignature: "",
    exitSignature: "",
  });

  const isFieldVisible = (id) => fieldSettings.find((f) => f.id === id)?.visible !== false;
  const isFieldRequired = (id) => fieldSettings.find((f) => f.id === id)?.required === true;

  const presentCount = useMemo(() => visits.filter((v) => v.status === "Presente").length, [visits]);
  const vehicleCount = useMemo(() => visits.filter((v) => v.status === "Presente" && (v.plate || v.trailerPlate)).length, [visits]);
  const todayCount = visits.length;
  const checkedEmergencyCount = useMemo(() => visits.filter((v) => v.status === "Presente" && v.emergencyChecked).length, [visits]);

  const filteredVisits = useMemo(() => {
    const q = search.toLowerCase();
    return visits.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.company.toLowerCase().includes(q) ||
        v.host.toLowerCase().includes(q) ||
        v.site.toLowerCase().includes(q)
    );
  }, [search, visits]);

  const checkoutResults = useMemo(() => {
    const q = checkoutQuery.toLowerCase().trim();
    return visits.filter((v) => {
      if (v.status !== "Presente") return false;
      if (!q) return true;
      return (
        v.name.toLowerCase().includes(q) ||
        v.company.toLowerCase().includes(q) ||
        v.plate.toLowerCase().includes(q) ||
        v.trailerPlate.toLowerCase().includes(q)
      );
    });
  }, [checkoutQuery, visits]);

  const emergencyResults = useMemo(() => {
    const q = emergencySearch.toLowerCase().trim();
    return visits.filter((v) => {
      if (v.status !== "Presente") return false;
      if (!q) return true;
      return (
        v.name.toLowerCase().includes(q) ||
        v.company.toLowerCase().includes(q) ||
        v.plate.toLowerCase().includes(q) ||
        v.trailerPlate.toLowerCase().includes(q) ||
        v.host.toLowerCase().includes(q)
      );
    });
  }, [emergencySearch, visits]);

  const handleCheckIn = () => {
    const requiredChecks = [
      { id: "name", value: form.name },
      { id: "company", value: form.company },
      { id: "host", value: form.host },
      { id: "reason", value: form.reason },
      { id: "site", value: form.site },
      { id: "entrySignature", value: form.entrySignature },
    ];

    const missingRequiredField = requiredChecks.some(
      (field) => isFieldVisible(field.id) && isFieldRequired(field.id) && !field.value
    );

    const missingPrivacy = isFieldVisible("privacy") && isFieldRequired("privacy") && !form.privacy;

    if (missingRequiredField || missingPrivacy) return;

    const newVisit = {
      id: Date.now(),
      name: form.name,
      company: form.company,
      plate: form.plate,
      trailerPlate: form.trailerPlate || "",
      host: form.host,
      reason: form.reason,
      type: form.type,
      status: "Presente",
      site: form.site,
      checkIn: new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }),
      checkOut: "",
      language,
      qrCode: `QR-${Date.now()}`,
      entrySignature: form.entrySignature,
      exitSignature: "",
      emergencyChecked: false,
    };

    setVisits([newVisit, ...visits]);
    setForm({
      name: "",
      company: "",
      plate: "",
      trailerPlate: "",
      host: "",
      reason: "",
      type: "Visitatore",
      site: "Sede Centrale",
      emailNotify: true,
      privacy: false,
      safety: false,
      entrySignature: "",
      exitSignature: "",
    });
    setAccessMode(null);
    setActiveTab("access");
  };

  const submitCheckout = (id, signatureValue = "") => {
    setVisits((prev) => prev.map((v) => (v.id === id ? {
      ...v,
      status: "Uscito",
      checkOut: new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }),
      exitSignature: signatureValue || v.exitSignature || v.name,
      emergencyChecked: false,
    } : v)));
  };

  const handleQrCheckout = () => {
    if (!qrSearch.trim()) return;
    const match = visits.find(
      (v) => v.status === "Presente" && v.qrCode.toLowerCase() === qrSearch.trim().toLowerCase()
    );
    if (match) {
      submitCheckout(match.id, match.name);
      setQrSearch("");
      setCheckoutQuery("");
      setAccessMode(null);
      setActiveTab("access");
    }
  };

  const goToEntry = () => {
    setAccessMode("entry");
    setActiveTab("tablet");
  };

  const goToExit = () => {
    setAccessMode("exit");
    setActiveTab("checkout");
  };

  const backToHome = () => {
    setAccessMode(null);
    setActiveTab("access");
  };

  const updateFieldSetting = (id, key, value) => {
    setFieldSettings((prev) => prev.map((field) => (field.id === id ? { ...field, [key]: value } : field)));
  };

  const addCustomField = () => {
    const cleaned = newFieldLabel.trim();
    if (!cleaned) return;
    const slug = cleaned.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
    if (!slug) return;
    setFieldSettings((prev) => [...prev, { id: `custom_${slug}_${Date.now()}`, label: cleaned, required: false, visible: true }]);
    setNewFieldLabel("");
  };

  const removeCustomField = (id) => {
    setFieldSettings((prev) => prev.filter((field) => field.id !== id));
  };

  const toggleEmergencyChecked = (id) => {
    setVisits((prev) => prev.map((v) => (v.id === id ? { ...v, emergencyChecked: !v.emergencyChecked } : v)));
  };

  const updateBranding = (key, value) => {
    setBranding((prev) => ({ ...prev, [key]: value }));
  };

  const resetBranding = () => {
    setBranding(defaultBranding);
  };

  const selectedPresetBackground = backgroundPresets.find((preset) => preset.id === branding.selectedPreset)?.value || backgroundPresets[0].value;
  const effectiveBackground = branding.appBackgroundUrl?.trim() ? `url(${branding.appBackgroundUrl.trim()}) center / cover no-repeat fixed` : selectedPresetBackground;
  const tabletBackground = branding.loginBackgroundUrl?.trim() ? `url(${branding.loginBackgroundUrl.trim()}) center / cover no-repeat` : effectiveBackground;

  return (
    <div
      className="min-h-screen p-4 md:p-8"
      style={{
        background: effectiveBackground,
      }}
    >
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: `rgba(255,255,255,${branding.overlayOpacity})` }}
      />
      <div className="relative mx-auto max-w-7xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border bg-background/80 shadow-sm">
              {branding.logoUrl ? (
                <img src={branding.logoUrl} alt="Logo aziendale" className="h-full w-full object-contain" />
              ) : (
                <Building2 className="h-7 w-7" />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Registro visitatori elettronico</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {branding.companyName} · Prototipo UI per tablet, accesso rapido, dashboard accessi, firma digitale ed elenco emergenze.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="rounded-2xl gap-2"><Download className="h-4 w-4" /> Export PDF</Button>
            <Button variant="outline" className="rounded-2xl gap-2"><Download className="h-4 w-4" /> Export Excel</Button>
            <Button className="rounded-2xl gap-2"><QrCode className="h-4 w-4" /> {t.generateQr}</Button>
          </div>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Presenti ora" value={presentCount} subtitle="Visitatori attualmente in sede" icon={Users} cardStyle={{ backgroundColor: `rgba(255,255,255,${branding.cardOpacity})`, backdropFilter: "blur(6px)" }} />
          <StatCard title="Automezzi presenti" value={vehicleCount} subtitle="Mezzi registrati con targa o rimorchio" icon={Truck} cardStyle={{ backgroundColor: `rgba(255,255,255,${branding.cardOpacity})`, backdropFilter: "blur(6px)" }} />
          <StatCard title="Accessi odierni" value={todayCount} subtitle="Totale check-in registrati" icon={Building2} cardStyle={{ backgroundColor: `rgba(255,255,255,${branding.cardOpacity})`, backdropFilter: "blur(6px)" }} />
          <StatCard title={t.emergencyChecked} value={checkedEmergencyCount} subtitle={t.emergencyPresent} icon={ClipboardCheck} cardStyle={{ backgroundColor: `rgba(255,255,255,${branding.cardOpacity})`, backdropFilter: "blur(6px)" }} />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-6 rounded-2xl">
            <TabsTrigger value="access">Ingresso / Uscita</TabsTrigger>
            <TabsTrigger value="tablet">Tablet Check-in</TabsTrigger>
            <TabsTrigger value="checkout">Check-out</TabsTrigger>
            <TabsTrigger value="emergency">Emergenza</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="settings">Impostazioni</TabsTrigger>
          </TabsList>

          <TabsContent value="access">
            <div className="mx-auto max-w-4xl">
              <Card className="rounded-3xl shadow-sm overflow-hidden" style={{ backgroundColor: `rgba(255,255,255,${branding.cardOpacity})`, backdropFilter: "blur(6px)" }}>
                <div className="border-b p-6" style={{ background: tabletBackground }}>
                  <div className="rounded-3xl bg-background/85 p-6 text-center backdrop-blur">
                    <CardHeader className="p-0 text-center">
                      <div className="mb-4 flex items-center justify-center gap-3">
                        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border bg-background/80">
                          {branding.logoUrl ? (
                            <img src={branding.logoUrl} alt="Logo aziendale" className="h-full w-full object-contain" />
                          ) : (
                            <Building2 className="h-6 w-6" />
                          )}
                        </div>
                        <div className="text-left">
                          <p className="text-sm text-muted-foreground">{branding.companyName}</p>
                          <CardTitle className="text-3xl">{t.selectOperation}</CardTitle>
                        </div>
                      </div>
                      <CardDescription>{t.simpleImmediate}</CardDescription>
                    </CardHeader>
                  </div>
                </div>
                <CardContent className="space-y-6">
                  <div className="mx-auto max-w-xs space-y-2">
                    <Label>{t.language}</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="rounded-2xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((l) => (
                          <SelectItem key={l.code} value={l.code}>{l.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <Button className="h-48 rounded-3xl text-4xl font-semibold" onClick={goToEntry}>
                      {t.enter}
                    </Button>
                    <Button variant="outline" className="h-48 rounded-3xl text-4xl font-semibold" onClick={goToExit}>
                      {t.exit}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tablet">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <Card className="rounded-3xl shadow-sm" style={{ backgroundColor: `rgba(255,255,255,${branding.cardOpacity})`, backdropFilter: "blur(6px)" }}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <CardTitle className="text-2xl">{t.visitorRegistration}</CardTitle>
                      <CardDescription>{t.tabletDescription}</CardDescription>
                    </div>
                    {accessMode === "entry" && (
                      <Button variant="outline" className="rounded-2xl gap-2" onClick={backToHome}>
                        <ArrowLeft className="h-4 w-4" /> {t.back}
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-2">
                    <Label>{t.accessType}</Label>
                    <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                      <SelectTrigger className="rounded-2xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Visitatore">{t.visitor}</SelectItem>
                        <SelectItem value="Autista">{t.driver}</SelectItem>
                        <SelectItem value="Fornitore">{t.supplier}</SelectItem>
                        <SelectItem value="Manutentore">{t.maintenance}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {isFieldVisible("name") && (
                      <div className="space-y-2">
                        <Label>{t.fullName} {isFieldRequired("name") ? "*" : ""}</Label>
                        <Input className="rounded-2xl" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={t.enterName} />
                      </div>
                    )}
                    {isFieldVisible("company") && (
                      <div className="space-y-2">
                        <Label>{t.company} {isFieldRequired("company") ? "*" : ""}</Label>
                        <Input className="rounded-2xl" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder={t.companyName} />
                      </div>
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    {isFieldVisible("plate") && (
                      <div className="space-y-2">
                        <Label>{t.vehiclePlate} {isFieldRequired("plate") ? "*" : ""}</Label>
                        <Input className="rounded-2xl" value={form.plate} onChange={(e) => setForm({ ...form, plate: e.target.value })} placeholder={t.optional} />
                      </div>
                    )}
                    {isFieldVisible("trailerPlate") && (
                      <div className="space-y-2">
                        <Label>{t.trailerPlate} {isFieldRequired("trailerPlate") ? "*" : ""}</Label>
                        <Input className="rounded-2xl" value={form.trailerPlate || ""} onChange={(e) => setForm({ ...form, trailerPlate: e.target.value })} placeholder={t.optional} />
                      </div>
                    )}
                    {isFieldVisible("site") && (
                      <div className="space-y-2">
                        <Label>{t.site} {isFieldRequired("site") ? "*" : ""}</Label>
                        <Select value={form.site} onValueChange={(v) => setForm({ ...form, site: v })}>
                          <SelectTrigger className="rounded-2xl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {sites.map((s) => (
                              <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {isFieldVisible("host") && (
                      <div className="space-y-2">
                        <Label>{t.host} {isFieldRequired("host") ? "*" : ""}</Label>
                        <Select value={form.host} onValueChange={(v) => setForm({ ...form, host: v })}>
                          <SelectTrigger className="rounded-2xl">
                            <SelectValue placeholder={t.selectHost} />
                          </SelectTrigger>
                          <SelectContent>
                            {hosts.map((h) => (
                              <SelectItem key={h} value={h}>{h}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    {isFieldVisible("reason") && (
                      <div className="space-y-2">
                        <Label>{t.reason} {isFieldRequired("reason") ? "*" : ""}</Label>
                        <Input className="rounded-2xl" value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} placeholder={t.reasonPlaceholder} />
                      </div>
                    )}
                  </div>

                  {isFieldVisible("entrySignature") && (
                    <SignatureBox
                      label={`${t.entrySignature} ${isFieldRequired("entrySignature") ? "*" : ""}`}
                      value={form.entrySignature}
                      onChange={(e) => setForm({ ...form, entrySignature: e.target.value })}
                      placeholder={t.signaturePlaceholder}
                    />
                  )}

                  <Separator />

                  <div className="space-y-4 rounded-2xl border p-4">
                    {isFieldVisible("privacy") && (
                      <div className="flex items-center gap-3">
                        <Checkbox checked={form.privacy} onCheckedChange={(v) => setForm({ ...form, privacy: Boolean(v) })} />
                        <Label>{t.privacy} {isFieldRequired("privacy") ? "*" : ""}</Label>
                      </div>
                    )}
                    {isFieldVisible("safety") && (
                      <div className="flex items-center gap-3">
                        <Checkbox checked={form.safety} onCheckedChange={(v) => setForm({ ...form, safety: Boolean(v) })} />
                        <Label>{t.safety}</Label>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <Checkbox checked={form.emailNotify} onCheckedChange={(v) => setForm({ ...form, emailNotify: Boolean(v) })} />
                      <Label>{t.notifyHost}</Label>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 md:flex-row">
                    <Button className="h-12 rounded-2xl px-6 text-base" onClick={handleCheckIn}>{t.confirmCheckin}</Button>
                    <Button variant="outline" className="h-12 rounded-2xl px-6 text-base gap-2">
                      <QrCode className="h-4 w-4" /> {t.generateQr}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl shadow-sm" style={{ backgroundColor: `rgba(255,255,255,${branding.cardOpacity})`, backdropFilter: "blur(6px)" }}>
                <CardHeader>
                  <CardTitle className="text-xl">Anteprima funzioni accesso</CardTitle>
                  <CardDescription>Elementi opzionali del flusso di registrazione.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-2xl border p-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Notifica al referente</p>
                        <p className="text-sm text-muted-foreground">Email automatica all’arrivo del visitatore.</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border p-4">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Firma in ingresso</p>
                        <p className="text-sm text-muted-foreground">Campo finale obbligatorio prima della conferma del check-in.</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border p-4">
                    <div className="flex items-center gap-3">
                      <Siren className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Elenco emergenze</p>
                        <p className="text-sm text-muted-foreground">Lista in tempo reale dei presenti disponibile per l’appello.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="checkout">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <Card className="rounded-3xl shadow-sm" style={{ backgroundColor: `rgba(255,255,255,${branding.cardOpacity})`, backdropFilter: "blur(6px)" }}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <CardTitle className="text-2xl">{t.checkoutTitle}</CardTitle>
                      <CardDescription>{t.checkoutDescription}</CardDescription>
                    </div>
                    {accessMode === "exit" && (
                      <Button variant="outline" className="rounded-2xl gap-2" onClick={backToHome}>
                        <ArrowLeft className="h-4 w-4" /> {t.back}
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-2">
                    <Label>{t.searchCheckout}</Label>
                    <Input
                      className="rounded-2xl"
                      value={checkoutQuery}
                      onChange={(e) => setCheckoutQuery(e.target.value)}
                      placeholder={t.searchCheckoutPlaceholder}
                    />
                  </div>

                  <div className="space-y-3">
                    {checkoutResults.length === 0 ? (
                      <div className="rounded-2xl border p-4 text-sm text-muted-foreground">{t.noResults}</div>
                    ) : (
                      checkoutResults.map((visit) => (
                        <div key={visit.id} className="rounded-2xl border p-4 space-y-4">
                          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div>
                              <p className="font-medium">{visit.name}</p>
                              <p className="text-sm text-muted-foreground">{visit.company} · {visit.type}</p>
                              <p className="text-sm text-muted-foreground">{visit.plate || "—"} {visit.trailerPlate ? `· ${visit.trailerPlate}` : ""}</p>
                            </div>
                            <StatusBadge status={visit.status} />
                          </div>
                          {isFieldVisible("exitSignature") && (
                            <SignatureBox
                              label={`${t.exitSignature} ${isFieldRequired("exitSignature") ? "*" : ""}`}
                              value={visit.exitSignature || ""}
                              onChange={(e) => setVisits((prev) => prev.map((v) => (v.id === visit.id ? { ...v, exitSignature: e.target.value } : v)))}
                              placeholder={t.signaturePlaceholder}
                            />
                          )}
                          <div className="flex justify-end">
                            <Button className="rounded-2xl" onClick={() => submitCheckout(visit.id, visit.exitSignature || visit.name)}>{t.confirmExit}</Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl shadow-sm" style={{ backgroundColor: `rgba(255,255,255,${branding.cardOpacity})`, backdropFilter: "blur(6px)" }}>
                <CardHeader>
                  <CardTitle className="text-xl">{t.qrTitle}</CardTitle>
                  <CardDescription>{t.qrDescription}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>{t.qrCodeLabel}</Label>
                    <Input
                      className="rounded-2xl"
                      value={qrSearch}
                      onChange={(e) => setQrSearch(e.target.value)}
                      placeholder={t.qrCodePlaceholder}
                    />
                  </div>
                  <Button className="w-full rounded-2xl gap-2" onClick={handleQrCheckout}>
                    <QrCode className="h-4 w-4" /> {t.registerExitQr}
                  </Button>
                  <div className="rounded-2xl border p-4 text-sm text-muted-foreground">
                    Nel prototipo la scansione è simulata inserendo manualmente il codice. In produzione questo pulsante si collegherebbe alla fotocamera del tablet o a un lettore QR.
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="emergency">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <Card className="rounded-3xl shadow-sm" style={{ backgroundColor: `rgba(255,255,255,${branding.cardOpacity})`, backdropFilter: "blur(6px)" }}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <CardTitle className="text-2xl flex items-center gap-2"><Siren className="h-6 w-6" /> {t.emergencyMode}</CardTitle>
                      <CardDescription>{t.emergencyDescription}</CardDescription>
                    </div>
                    <Button variant="outline" className="rounded-2xl" onClick={clearEmergencyRollCall}>{t.clearRollCall}</Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>{t.searchEmergency}</Label>
                    <Input value={emergencySearch} onChange={(e) => setEmergencySearch(e.target.value)} placeholder={t.searchEmergencyPlaceholder} className="rounded-2xl" />
                  </div>
                  <div className="space-y-3">
                    {emergencyResults.length === 0 ? (
                      <div className="rounded-2xl border p-4 text-sm text-muted-foreground">{t.noEmergencyResults}</div>
                    ) : (
                      emergencyResults.map((visit) => (
                        <div key={visit.id} className="flex flex-col gap-3 rounded-2xl border p-4 md:flex-row md:items-center md:justify-between">
                          <div>
                            <p className="font-medium">{visit.name}</p>
                            <p className="text-sm text-muted-foreground">{visit.company} · {visit.type} · {visit.site}</p>
                            <p className="text-sm text-muted-foreground">{visit.host} · {visit.checkIn}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant={visit.emergencyChecked ? "default" : "secondary"}>
                              {visit.emergencyChecked ? t.checkedStatus : t.pendingStatus}
                            </Badge>
                            <Button className="rounded-2xl" variant={visit.emergencyChecked ? "outline" : "default"} onClick={() => toggleEmergencyChecked(visit.id)}>
                              {t.markPresent}
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl shadow-sm" style={{ backgroundColor: `rgba(255,255,255,${branding.cardOpacity})`, backdropFilter: "blur(6px)" }}>
                <CardHeader>
                  <CardTitle className="text-xl">{t.emergencyPresent}</CardTitle>
                  <CardDescription>{t.emergencyChecked}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-2xl border p-4">
                    <p className="text-sm text-muted-foreground">{t.emergencyPresent}</p>
                    <p className="mt-2 text-3xl font-semibold">{presentCount}</p>
                  </div>
                  <div className="rounded-2xl border p-4">
                    <p className="text-sm text-muted-foreground">{t.emergencyChecked}</p>
                    <p className="mt-2 text-3xl font-semibold">{checkedEmergencyCount}</p>
                  </div>
                  <div className="rounded-2xl border p-4">
                    <p className="text-sm text-muted-foreground">Da verificare</p>
                    <p className="mt-2 text-3xl font-semibold">{Math.max(presentCount - checkedEmergencyCount, 0)}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="dashboard">
            <Card className="rounded-3xl shadow-sm" style={{ backgroundColor: `rgba(255,255,255,${branding.cardOpacity})`, backdropFilter: "blur(6px)" }}>
              <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <CardTitle className="text-2xl">Presenze in area riservata</CardTitle>
                  <CardDescription>Monitoraggio visitatori, automezzi e stato accessi in tempo reale.</CardDescription>
                </div>
                <div className="relative w-full lg:w-80">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input className="rounded-2xl pl-9" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cerca nominativo, azienda, referente..." />
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1080px] text-sm">
                    <thead>
                      <tr className="border-b text-left text-muted-foreground">
                        <th className="px-3 py-3 font-medium">Nome</th>
                        <th className="px-3 py-3 font-medium">Azienda</th>
                        <th className="px-3 py-3 font-medium">Tipologia</th>
                        <th className="px-3 py-3 font-medium">Targa</th>
                        <th className="px-3 py-3 font-medium">Targa rimorchio</th>
                        <th className="px-3 py-3 font-medium">Referente</th>
                        <th className="px-3 py-3 font-medium">Ingresso</th>
                        <th className="px-3 py-3 font-medium">Uscita</th>
                        <th className="px-3 py-3 font-medium">Stato</th>
                        <th className="px-3 py-3 font-medium">Firma ingresso</th>
                        <th className="px-3 py-3 font-medium">Firma uscita</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVisits.map((visit) => (
                        <tr key={visit.id} className="border-b last:border-0">
                          <td className="px-3 py-4 font-medium">{visit.name}</td>
                          <td className="px-3 py-4">{visit.company}</td>
                          <td className="px-3 py-4">{visit.type}</td>
                          <td className="px-3 py-4">{visit.plate || "—"}</td>
                          <td className="px-3 py-4">{visit.trailerPlate || "—"}</td>
                          <td className="px-3 py-4">{visit.host}</td>
                          <td className="px-3 py-4">{visit.checkIn}</td>
                          <td className="px-3 py-4">{visit.checkOut || "—"}</td>
                          <td className="px-3 py-4"><StatusBadge status={visit.status} /></td>
                          <td className="px-3 py-4">{visit.entrySignature || "—"}</td>
                          <td className="px-3 py-4">{visit.exitSignature || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="rounded-3xl shadow-sm lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Impostazioni campi</CardTitle>
                  <CardDescription>Configura i campi del modulo di registrazione: visibilità, obbligatorietà e campi personalizzati.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] text-sm">
                      <thead>
                        <tr className="border-b text-left text-muted-foreground">
                          <th className="px-3 py-3 font-medium">Campo</th>
                          <th className="px-3 py-3 font-medium">Visibile</th>
                          <th className="px-3 py-3 font-medium">Obbligatorio</th>
                          <th className="px-3 py-3 font-medium text-right">Azione</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fieldSettings.map((field) => {
                          const isCustom = field.id.startsWith("custom_");
                          return (
                            <tr key={field.id} className="border-b last:border-0">
                              <td className="px-3 py-4 font-medium">{field.label}</td>
                              <td className="px-3 py-4">
                                <Checkbox checked={field.visible} onCheckedChange={(v) => updateFieldSetting(field.id, "visible", Boolean(v))} />
                              </td>
                              <td className="px-3 py-4">
                                <Checkbox checked={field.required} onCheckedChange={(v) => updateFieldSetting(field.id, "required", Boolean(v))} disabled={!field.visible} />
                              </td>
                              <td className="px-3 py-4 text-right">
                                {isCustom ? (
                                  <Button variant="ghost" className="rounded-2xl" onClick={() => removeCustomField(field.id)}>
                                    Rimuovi
                                  </Button>
                                ) : (
                                  <span className="text-xs text-muted-foreground">Campo base</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="rounded-2xl border p-4">
                    <p className="font-medium">Aggiungi campo personalizzato</p>
                    <p className="mt-1 text-sm text-muted-foreground">Puoi inserire nuovi campi da mostrare nel modulo, ad esempio numero documento, reparto visitato o note accesso.</p>
                    <div className="mt-4 flex flex-col gap-3 md:flex-row">
                      <Input className="rounded-2xl" value={newFieldLabel} onChange={(e) => setNewFieldLabel(e.target.value)} placeholder="Es. Numero documento" />
                      <Button className="rounded-2xl" onClick={addCustomField}>Aggiungi campo</Button>
                    </div>
                  </div>

                  <div className="rounded-2xl border p-4 space-y-4">
                    <div className="flex items-center gap-3">
                      <Palette className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Branding aziendale</p>
                        <p className="text-sm text-muted-foreground">Personalizza logo e sfondi dell'app usando URL di immagini aziendali.</p>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Nome azienda</Label>
                        <Input className="rounded-2xl" value={branding.companyName} onChange={(e) => updateBranding("companyName", e.target.value)} placeholder="Es. Plast 2000 S.p.A." />
                      </div>
                      <div className="space-y-2">
                        <Label>Preset sfondo</Label>
                        <Select value={branding.selectedPreset} onValueChange={(value) => updateBranding("selectedPreset", value)}>
                          <SelectTrigger className="rounded-2xl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {backgroundPresets.map((preset) => (
                              <SelectItem key={preset.id} value={preset.id}>{preset.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Logo aziendale (URL immagine)</Label>
                        <Input className="rounded-2xl" value={branding.logoUrl} onChange={(e) => updateBranding("logoUrl", e.target.value)} placeholder="https://.../logo.png" />
                      </div>
                      <div className="space-y-2">
                        <Label>Sfondo generale app (URL immagine)</Label>
                        <Input className="rounded-2xl" value={branding.appBackgroundUrl} onChange={(e) => updateBranding("appBackgroundUrl", e.target.value)} placeholder="https://.../sfondo.jpg" />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Sfondo schermata ingresso/uscita (URL immagine)</Label>
                        <Input className="rounded-2xl" value={branding.loginBackgroundUrl} onChange={(e) => updateBranding("loginBackgroundUrl", e.target.value)} placeholder="https://.../reception.jpg" />
                      </div>
                      <div className="space-y-2">
                        <Label>Trasparenza overlay ({branding.overlayOpacity.toFixed(2)})</Label>
                        <input className="w-full" type="range" min="0.2" max="0.95" step="0.05" value={branding.overlayOpacity} onChange={(e) => updateBranding("overlayOpacity", Number(e.target.value))} />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Opacità pannelli ({branding.cardOpacity.toFixed(2)})</Label>
                        <input className="w-full" type="range" min="0.65" max="1" step="0.05" value={branding.cardOpacity} onChange={(e) => updateBranding("cardOpacity", Number(e.target.value))} />
                      </div>
                      <div className="flex items-end">
                        <Button variant="outline" className="rounded-2xl gap-2" onClick={resetBranding}>
                          <Eraser className="h-4 w-4" /> Ripristina branding
                        </Button>
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3">
                      <div className="rounded-2xl border bg-background/70 p-3">
                        <p className="text-xs text-muted-foreground">Logo</p>
                        <div className="mt-2 flex h-20 items-center justify-center rounded-xl border bg-background">
                          {branding.logoUrl ? <img src={branding.logoUrl} alt="Anteprima logo" className="h-full w-full object-contain p-2" /> : <ImageIcon className="h-7 w-7 text-muted-foreground" />}
                        </div>
                      </div>
                      <div className="rounded-2xl border p-3" style={{ background: effectiveBackground }}>
                        <p className="text-xs text-muted-foreground">Anteprima app</p>
                        <div className="mt-2 h-20 rounded-xl border bg-background/70" />
                      </div>
                      <div className="rounded-2xl border p-3" style={{ background: tabletBackground }}>
                        <p className="text-xs text-muted-foreground">Anteprima reception</p>
                        <div className="mt-2 h-20 rounded-xl border bg-background/70" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl shadow-sm" style={{ backgroundColor: `rgba(255,255,255,${branding.cardOpacity})`, backdropFilter: "blur(6px)" }}>
                <CardHeader>
                  <CardTitle className="text-xl">Roadmap</CardTitle>
                  <CardDescription>Estensioni utili dopo il primo rilascio.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="rounded-2xl border p-3">Firma grafometrica reale</div>
                  <div className="rounded-2xl border p-3">Stampa report emergenze</div>
                  <div className="rounded-2xl border p-3">Integrazione stampante badge</div>
                  <div className="rounded-2xl border p-3">Acquisizione documento / foto</div>
                  <div className="rounded-2xl border p-3">Report automatici mensili</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
