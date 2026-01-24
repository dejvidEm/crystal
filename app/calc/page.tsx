"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Sparkles, Clock, MapPin, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LanguageWrapper } from "@/components/language-wrapper"
import { StickySummary } from "@/components/calc/sticky-summary"
import { ResultCard } from "@/components/calc/result-card"
import { CalcBackButton } from "@/components/calc/back-button"
import { calculatePrice, calculateTime, type CalculatorData } from "@/lib/calc-logic"

const TOTAL_STEPS = 5

export default function CalculatorPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<CalculatorData>({
    vehicleType: null,
    condition: null,
    mainService: null,
    addons: [],
    cityOrZip: "",
    parkingType: null,
  })
  const [isCalculating, setIsCalculating] = useState(false)

  // Track calculator started
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "calc_started", {
        event_category: "calculator",
        event_label: "page_load",
      })
    }
  }, [])

  const progress = (currentStep / TOTAL_STEPS) * 100

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleVehicleTypeChange = (value: string) => {
    setData({ ...data, vehicleType: value as "small" | "medium" | "large" })
    // Auto-advance to next step
    setTimeout(() => {
      setCurrentStep(2)
    }, 300)
  }

  const handleConditionChange = (value: string) => {
    setData({ ...data, condition: value as "normal" | "dirty" | "extreme" })
    // Auto-advance to next step
    setTimeout(() => {
      setCurrentStep(3)
    }, 300)
  }

  const handleMainServiceChange = (value: string) => {
    const newMainService = value as "exterior" | "interior" | "exterior_interior" | "seats_only"
    // Clear seats addon if main service is seats_only
    if (value === "seats_only") {
      setData((prev) => ({
        ...prev,
        mainService: newMainService,
        addons: prev.addons.filter((a) => a !== "seats"),
      }))
    } else {
      setData({ ...data, mainService: newMainService })
    }
    // Auto-advance to next step
    setTimeout(() => {
      setCurrentStep(4)
    }, 300)
  }

  const handleAddonToggle = (addon: string) => {
    setData((prev) => ({
      ...prev,
      addons: prev.addons.includes(addon)
        ? prev.addons.filter((a) => a !== addon)
        : [...prev.addons, addon],
    }))
  }

  const handleCityChange = (value: string) => {
    const newData = { ...data, cityOrZip: value }
    setData(newData)
    // Auto-advance to result if parking type is also selected and city is filled
    if (newData.parkingType !== null && value.trim() !== "") {
      setTimeout(() => {
        setCurrentStep(TOTAL_STEPS)
      }, 300)
    }
  }

  const handleParkingTypeChange = (value: string) => {
    const newData = { ...data, parkingType: value as "private" | "public" }
    setData(newData)
    // Auto-advance to result if city is also filled
    if (newData.cityOrZip.trim() !== "") {
      setTimeout(() => {
        setCurrentStep(TOTAL_STEPS)
      }, 300)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return data.vehicleType !== null
      case 2:
        return data.condition !== null
      case 3:
        return data.mainService !== null
      case 4:
        return true // Add-ons are optional
      case 5:
        return data.cityOrZip.trim() !== "" && data.parkingType !== null
      default:
        return false
    }
  }

  const shouldShowAddons = () => {
    return data.mainService !== "seats_only"
  }

  const priceRange = calculatePrice(data)
  const timeRange = calculateTime(data)

  // Show calculating state before final result
  useEffect(() => {
    if (currentStep === TOTAL_STEPS && canProceed()) {
      setIsCalculating(true)
      const timer = setTimeout(() => {
        setIsCalculating(false)
        // Track calculator completed
        if (typeof window !== "undefined" && (window as any).gtag) {
          const finalPriceRange = calculatePrice(data)
          ;(window as any).gtag("event", "calc_completed", {
            event_category: "calculator",
            event_label: "result_shown",
            value: finalPriceRange.max,
          })
        }
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [currentStep, data])

  return (
    <LanguageWrapper>
      {(t) => (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          <Navbar />
          
          <div className="container mx-auto px-4 pt-24 pb-8 md:pt-28 md:pb-12">
            <div className="mx-auto max-w-2xl">
              {/* Return to main page button - Mobile only */}
              <div className="mb-6 flex justify-center md:hidden">
                <CalcBackButton isFixed={false} />
              </div>
              
              {/* Return to main page button - Desktop fixed */}
              <div className="hidden md:block">
                <CalcBackButton isFixed={true} />
              </div>

              {/* Header */}
              <div className="mb-8 text-center">
                <h1 className="mb-2 text-3xl font-bold sm:text-4xl text-gradient">
                  {t.calculator?.title || "Get Your Instant Quote"}
                </h1>
                <p className="text-muted-foreground">
                  {t.calculator?.subtitle || "Answer a few quick questions to get your personalized estimate"}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    {t.calculator?.step || "Step"} {currentStep} {t.calculator?.of || "of"} {TOTAL_STEPS}
                  </span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Step Content */}
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <h2 className="mb-6 text-xl font-semibold">
                          {t.calculator?.step1Title || "What type of vehicle do you have?"}
                        </h2>
                        <RadioGroup value={data.vehicleType || ""} onValueChange={handleVehicleTypeChange}>
                          <div className="grid gap-4 sm:grid-cols-3">
                            <StepCard
                              value="small"
                              label={t.calculator?.vehicleSmall || "Small"}
                              description={t.calculator?.vehicleSmallDesc || "Hatchback / Sedan"}
                              selected={data.vehicleType === "small"}
                              mostPopular={false}
                              name="vehicleType"
                            />
                            <StepCard
                              value="medium"
                              label={t.calculator?.vehicleMedium || "Medium"}
                              description={t.calculator?.vehicleMediumDesc || "Wagon / Small SUV"}
                              selected={data.vehicleType === "medium"}
                              mostPopular={true}
                              name="vehicleType"
                            />
                            <StepCard
                              value="large"
                              label={t.calculator?.vehicleLarge || "Large"}
                              description={t.calculator?.vehicleLargeDesc || "Large SUV / Van"}
                              selected={data.vehicleType === "large"}
                              mostPopular={false}
                              name="vehicleType"
                            />
                          </div>
                        </RadioGroup>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <h2 className="mb-6 text-xl font-semibold">
                          {t.calculator?.step2Title || "What's the condition of your vehicle?"}
                        </h2>
                        <RadioGroup value={data.condition || ""} onValueChange={handleConditionChange}>
                          <div className="grid gap-4 sm:grid-cols-3">
                            <StepCard
                              value="normal"
                              label={t.calculator?.conditionNormal || "Normal"}
                              description={t.calculator?.conditionNormalDesc || "Regular maintenance"}
                              selected={data.condition === "normal"}
                              mostPopular={true}
                              name="condition"
                            />
                            <StepCard
                              value="dirty"
                              label={t.calculator?.conditionDirty || "Dirty"}
                              description={t.calculator?.conditionDirtyDesc || "Needs extra attention"}
                              selected={data.condition === "dirty"}
                              mostPopular={false}
                              name="condition"
                            />
                            <StepCard
                              value="extreme"
                              label={t.calculator?.conditionExtreme || "Extreme"}
                              description={t.calculator?.conditionExtremeDesc || "Heavy soiling"}
                              selected={data.condition === "extreme"}
                              mostPopular={false}
                              name="condition"
                            />
                          </div>
                        </RadioGroup>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <h2 className="mb-6 text-xl font-semibold">
                          {t.calculator?.step3Title || "What service do you need?"}
                        </h2>
                        <RadioGroup value={data.mainService || ""} onValueChange={handleMainServiceChange}>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <StepCard
                              value="exterior"
                              label={t.calculator?.serviceExterior || "Exterior"}
                              description={t.calculator?.serviceExteriorDesc || "Outside cleaning & protection"}
                              selected={data.mainService === "exterior"}
                              mostPopular={false}
                              name="mainService"
                            />
                            <StepCard
                              value="interior"
                              label={t.calculator?.serviceInterior || "Interior"}
                              description={t.calculator?.serviceInteriorDesc || "Inside cleaning & care"}
                              selected={data.mainService === "interior"}
                              mostPopular={false}
                              name="mainService"
                            />
                            <StepCard
                              value="exterior_interior"
                              label={t.calculator?.serviceBoth || "Exterior + Interior"}
                              description={t.calculator?.serviceBothDesc || "Complete detailing"}
                              selected={data.mainService === "exterior_interior"}
                              mostPopular={true}
                              name="mainService"
                            />
                            <StepCard
                              value="seats_only"
                              label={t.calculator?.serviceSeats || "Seats Only"}
                              description={t.calculator?.serviceSeatsDesc || "Seat shampooing"}
                              selected={data.mainService === "seats_only"}
                              mostPopular={false}
                              name="mainService"
                            />
                          </div>
                        </RadioGroup>
                        {currentStep === 3 && (
                          <p className="mt-6 text-sm text-muted-foreground text-center">
                            {t.calculator?.almostDone || "You're almost done (2 steps left)"}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {currentStep === 4 && shouldShowAddons() && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <h2 className="mb-6 text-xl font-semibold">
                          {t.calculator?.step4Title || "Add any extras? (Optional)"}
                        </h2>
                        <div className="space-y-4">
                          <AddonCard
                            id="wax"
                            label={t.calculator?.addonWax || "Wax / Sealant"}
                            description={t.calculator?.addonWaxDesc || "+25 € / +30 min"}
                            checked={data.addons.includes("wax")}
                            onToggle={() => handleAddonToggle("wax")}
                          />
                          <AddonCard
                            id="ozone"
                            label={t.calculator?.addonOzone || "Ozone / Disinfection"}
                            description={t.calculator?.addonOzoneDesc || "+15 € / +20 min"}
                            checked={data.addons.includes("ozone")}
                            onToggle={() => handleAddonToggle("ozone")}
                          />
                          <AddonCard
                            id="plastics"
                            label={t.calculator?.addonPlastics || "Plastic Restoration"}
                            description={t.calculator?.addonPlasticsDesc || "+10 € / +20 min"}
                            checked={data.addons.includes("plastics")}
                            onToggle={() => handleAddonToggle("plastics")}
                          />
                          <AddonCard
                            id="seats"
                            label={t.calculator?.addonSeats || "Seat Shampooing"}
                            description={t.calculator?.addonSeatsDesc || "+30 € / +60 min"}
                            checked={data.addons.includes("seats")}
                            onToggle={() => handleAddonToggle("seats")}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {currentStep === 4 && !shouldShowAddons() && (
                  <motion.div
                    key="step4-skip"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <h2 className="mb-6 text-xl font-semibold">
                          {t.calculator?.step4Title || "Add any extras? (Optional)"}
                        </h2>
                        <div className="space-y-4">
                          <AddonCard
                            id="wax"
                            label={t.calculator?.addonWax || "Wax / Sealant"}
                            description={t.calculator?.addonWaxDesc || "+25 € / +30 min"}
                            checked={data.addons.includes("wax")}
                            onToggle={() => handleAddonToggle("wax")}
                          />
                          <AddonCard
                            id="ozone"
                            label={t.calculator?.addonOzone || "Ozone / Disinfection"}
                            description={t.calculator?.addonOzoneDesc || "+15 € / +20 min"}
                            checked={data.addons.includes("ozone")}
                            onToggle={() => handleAddonToggle("ozone")}
                          />
                          <AddonCard
                            id="plastics"
                            label={t.calculator?.addonPlastics || "Plastic Restoration"}
                            description={t.calculator?.addonPlasticsDesc || "+10 € / +20 min"}
                            checked={data.addons.includes("plastics")}
                            onToggle={() => handleAddonToggle("plastics")}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {currentStep === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <h2 className="mb-6 text-xl font-semibold">
                          {t.calculator?.step5Title || "Where should we come?"}
                        </h2>
                        <div className="space-y-6">
                          <div>
                            <Label htmlFor="city" className="mb-2 block">
                              {t.calculator?.cityLabel || "City or ZIP code"}
                            </Label>
                            <Input
                              id="city"
                              type="text"
                              placeholder={t.calculator?.cityPlaceholder || "Bratislava, 81101..."}
                              value={data.cityOrZip}
                              onChange={(e) => handleCityChange(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label className="mb-4 block">
                              {t.calculator?.parkingLabel || "Parking type"}
                            </Label>
                            <RadioGroup value={data.parkingType || ""} onValueChange={handleParkingTypeChange}>
                              <div className="grid gap-4 sm:grid-cols-2">
                                <StepCard
                                  value="private"
                                  label={t.calculator?.parkingPrivate || "Private"}
                                  description={t.calculator?.parkingPrivateDesc || "House / Company"}
                                  selected={data.parkingType === "private"}
                                  mostPopular={true}
                                  name="parkingType"
                                />
                                <StepCard
                                  value="public"
                                  label={t.calculator?.parkingPublic || "Public"}
                                  description={t.calculator?.parkingPublicDesc || "Street / Public parking"}
                                  selected={data.parkingType === "public"}
                                  mostPopular={false}
                                  name="parkingType"
                                />
                              </div>
                            </RadioGroup>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {currentStep === TOTAL_STEPS && canProceed() && !isCalculating && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ResultCard priceRange={priceRange} timeRange={timeRange} data={data} />
                  </motion.div>
                )}

                {currentStep === TOTAL_STEPS && canProceed() && isCalculating && (
                  <motion.div
                    key="calculating"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Card>
                      <CardContent className="p-12 text-center">
                        <div className="mb-4 inline-block animate-spin">
                          <Sparkles className="h-8 w-8 text-primary" />
                        </div>
                        <p className="text-lg text-muted-foreground">
                          {t.calculator?.calculating || "Calculating..."}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              {currentStep < TOTAL_STEPS && (
                <div className="mt-8 flex gap-4">
                  {currentStep > 1 && (
                    <Button variant="outline" onClick={handleBack} className="flex-1 sm:flex-initial">
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      {t.calculator?.back || "Back"}
                    </Button>
                  )}
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="flex-1 sm:flex-initial bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {t.calculator?.next || "Next"}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Sticky Summary (shown after step 2) */}
          {currentStep > 2 && currentStep < TOTAL_STEPS && (
            <StickySummary priceRange={priceRange} timeRange={timeRange} onNext={handleNext} canProceed={canProceed()} />
          )}

          <Footer />
        </div>
      )}
    </LanguageWrapper>
  )
}

// Step Card Component
function StepCard({
  value,
  label,
  description,
  selected,
  mostPopular,
  name,
}: {
  value: string
  label: string
  description: string
  selected: boolean
  mostPopular: boolean
  name?: string
}) {
  return (
    <div className="relative">
      <label
        htmlFor={`${name}-${value}`}
        className={`flex cursor-pointer flex-col rounded-lg border-2 p-4 transition-all ${
          selected
            ? "border-primary bg-primary/10"
            : "border-border bg-card hover:border-primary/50"
        }`}
      >
        <div className="mb-2 flex items-center justify-between">
          <RadioGroupItem value={value} id={`${name}-${value}`} className="mt-1" />
          {mostPopular && (
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
              Most Popular
            </span>
          )}
        </div>
        <div className="font-semibold">{label}</div>
        <div className="mt-1 text-sm text-muted-foreground">{description}</div>
      </label>
    </div>
  )
}

// Addon Card Component
function AddonCard({
  id,
  label,
  description,
  checked,
  onToggle,
}: {
  id: string
  label: string
  description: string
  checked: boolean
  onToggle: () => void
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-4 rounded-lg border-2 p-4 transition-all ${
        checked ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/50"
      }`}
    >
      <Checkbox id={id} checked={checked} onCheckedChange={onToggle} />
      <div className="flex-1">
        <div className="font-semibold">{label}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
      </div>
    </label>
  )
}

