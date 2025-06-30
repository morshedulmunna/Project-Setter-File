import EducationToolsBackground from "@/assets/animated-bg/EducationTools";
import LoginForm from "@/forms/LoginForm";
import React, { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Loader2 } from "lucide-react";

type Props = {};

export default function LoginPage({}: Props) {
  return (
    <div className="min-h-screen bg-red-200 py-4 flex items-center justify-center relative overflow-hidden">
      {/* Background image */}

      <EducationToolsBackground />

      <div className="w-full max-w-[400px] space-y-8 z-20">
        <div className="flex flex-col items-center space-y-2">
          <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-sm mb-4">
            <Image src="/images/TutorPlan-Logo-600x600.jpg" alt="TutorsPlan Logo" width={120} height={120} priority />
          </div>
          <h1 className="text-2xl font-bold text-center text-black">Global Team Login</h1>
          <p className="text-center text-slate-400 text-sm">Empowering Education, Enriching Communities</p>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm border-gray-200  shadow-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">Welcome back</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense
              fallback={
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="animate-spin h-6 w-6" />
                </div>
              }
            >
              <LoginForm />
            </Suspense>
          </CardContent>
        </Card>

        <div className="text-sm text-center space-y-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg border border-gray-200 shadow-sm">
          <p className="text-gray-800">Together, We Succeed</p>
          <p className="text-sm font-medium text-gray-800">Your efforts inspire learning, uplift communities, and make TutorsPlan a global success!</p>
        </div>
      </div>
    </div>
  );
}
