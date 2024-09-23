'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const matches = [
  { team1: "Arsenal", team2: "Chelsea" },
  { team1: "Liverpool", team2: "Man City" },
  { team1: "Man United", team2: "Tottenham" },
  { team1: "Leicester", team2: "Everton" },
  { team1: "West Ham", team2: "Newcastle" },
  { team1: "Aston Villa", team2: "Wolves" },
  { team1: "Brighton", team2: "Crystal Palace" },
  { team1: "Brentford", team2: "Fulham" },
  { team1: "Leeds", team2: "Southampton" },
  { team1: "Nottingham Forest", team2: "Bournemouth" },
]

export default function page() {
  const [predictions, setPredictions] = useState(
    matches.map(() => ({ team1Score: "", team2Score: "" }))
  )
  const [gameweekSpecial, setGameweekSpecial] = useState("")

  const handlePredictionChange = (index: number, team: "team1Score" | "team2Score", value: string) => {
    const newPredictions = [...predictions]
    newPredictions[index][team] = value
    setPredictions(newPredictions)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Predictions:", predictions)
    console.log("Gameweek Special:", gameweekSpecial)
    // Here you would typically send the data to your backend
  }
  return (
    <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Predict Gameweek 38</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {matches.map((match, index) => (
            <div key={index} className="flex items-center space-x-4">
              <Label className="w-32 text-right">{match.team1}</Label>
              <Input
                type="number"
                min="0"
                className="w-16"
                value={predictions[index].team1Score}
                onChange={(e) => handlePredictionChange(index, "team1Score", e.target.value)}
              />
              <span>-</span>
              <Input
                type="number"
                min="0"
                className="w-16"
                value={predictions[index].team2Score}
                onChange={(e) => handlePredictionChange(index, "team2Score", e.target.value)}
              />
              <Label className="w-32">{match.team2}</Label>
            </div>
          ))}
          <div className="flex items-center space-x-4">
            <Label className="w-32 text-right">Gameweek Special</Label>
            <Input
              type="number"
              min="0"
              className="w-16"
              value={gameweekSpecial}
              onChange={(e) => setGameweekSpecial(e.target.value)}
            />
          </div>
          <Button type="submit" className="mt-4">Submit Predictions</Button>
        </form>
      </div>
  )
}
