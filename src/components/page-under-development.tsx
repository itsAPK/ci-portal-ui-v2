import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Code2, ArrowLeft } from 'lucide-react'
import Link from "next/link"

export default function PageUnderDevelopment() {
  return (
    <div className="min-h-full flex items-center justify-center">
      <Card className="w-full max-w-md border-none bg-white shadow-none">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full p-3 w-16 h-16 flex items-center justify-center">
            <Code2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-3xl font-bold">Page Under Development</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
            We're currently crafting something awesome for you. Our development team is working diligently to bring you an enhanced experience.
          </p>
          <p className="text-center text-gray-500 dark:text-gray-500 text-sm">
            Expected completion: Soon™
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4 flex-col">
          <Button asChild variant="outline">
            <Link href="/opportunity">
              <ArrowLeft className="mr-2 h-4 w-4" /> Return to Opportunity Section
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/opportunity/1">
              <ArrowLeft className="mr-2 h-4 w-4" /> Return to Opportunity Overview Section
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/auth/login">
              <ArrowLeft className="mr-2 h-4 w-4" /> Return to Login
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

