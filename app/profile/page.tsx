"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserLeaderboardChart } from "@/components/userLeaderboard"
import { ChevronDown } from "lucide-react"

// Mock data for the profile
const userData = {
  name: "John Doe",
  totalPoints: 450,
  gameweeks: [
    { number: 1, points: 50 },
    { number: 2, points: 65 },
    { number: 3, points: 45 },
    { number: 4, points: 70 },
    { number: 5, points: 55 },
    { number: 6, points: 60 },
    { number: 7, points: 40 },
    { number: 8, points: 65 },
  ],
}

type SortOption = "latest" | "oldest" | "highestPoints" | "lowestPoints"

export default function ProfilePage() {
  const [sortOption, setSortOption] = useState<SortOption>("latest")

  const sortedGameweeks = [...userData.gameweeks].sort((a, b) => {
    switch (sortOption) {
      case "latest":
        return b.number - a.number
      case "oldest":
        return a.number - b.number
      case "highestPoints":
        return b.points - a.points
      case "lowestPoints":
        return a.points - b.points
      default:
        return 0
    }
  })

  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* User Info */}
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="w-24 h-24">
          <AvatarFallback className="text-2xl">{userData.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold">{userData.name}</h1>
        <p className="text-xl">Total Points: {userData.totalPoints}</p>
      </div>

      {/* Leaderboard Graph */}
      <UserLeaderboardChart data={userData.gameweeks} />

      {/* Sorting Dropdown */}
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Sort Gameweeks <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSortOption("latest")}>
              Latest to Oldest
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOption("oldest")}>
              Oldest to Latest
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOption("highestPoints")}>
              Highest Points to Lowest
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOption("lowestPoints")}>
              Lowest Points to Highest
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Gameweek Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-screen-lg mx-auto">
        {sortedGameweeks.map((gw) => (
          <Card key={gw.number}>
            <CardHeader>
              <CardTitle>Gameweek {gw.number}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{gw.points} points</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}