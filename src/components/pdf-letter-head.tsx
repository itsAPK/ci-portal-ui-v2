import React from 'react'
import Image from 'next/image'

interface PDFLetterheadRootProps {
  children: React.ReactNode
  className?: string
}

interface PDFLetterheadLogoProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}

interface PDFLetterheadContentProps {
  children: React.ReactNode
  className?: string
}

interface PDFLetterheadTitleProps {
  children: React.ReactNode
  className?: string
}

interface PDFLetterheadDescriptionProps {
  children: React.ReactNode
  className?: string
}

interface PDFLetterheadRightDataProps {
  children: React.ReactNode
  className?: string
}

const PDFLetterheadRoot: React.FC<PDFLetterheadRootProps> = ({ children, className = '' }) => (
  <div className={`w-full py-6 px-2 bg-white border-b-2 border-gray-200 print:border-b-0 ${className}`}>
    {children}
  </div>
)

const PDFLetterheadLogo: React.FC<PDFLetterheadLogoProps> = ({ src, alt, width = 100, height = 100, className = '' }) => (
  <div className="flex-shrink-0">
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`object-cover ${className}`}
    />
  </div>
)

const PDFLetterheadContent: React.FC<PDFLetterheadContentProps> = ({ children, className = '' }) => (
  <div className={`flex-grow ${className}`}>
    {children}
  </div>
)

const PDFLetterheadTitle: React.FC<PDFLetterheadTitleProps> = ({ children, className = '' }) => (
  <h1 className={`text-2xl font-bold text-gray-800 ${className}`}>{children}</h1>
)

const PDFLetterheadDescription: React.FC<PDFLetterheadDescriptionProps> = ({ children, className = '' }) => (
  <p className={`text-sm text-gray-600 ${className}`}>{children}</p>
)

const PDFLetterheadRightData: React.FC<PDFLetterheadRightDataProps> = ({ children, className = '' }) => (
  <div className={`flex-shrink-0 text-right ${className}`}>
    {children}
  </div>
)

const PDFLetterhead = {
  Root: PDFLetterheadRoot,
  Logo: PDFLetterheadLogo,
  Content: PDFLetterheadContent,
  Title: PDFLetterheadTitle,
  Description: PDFLetterheadDescription,
  RightData: PDFLetterheadRightData,
}

export default PDFLetterhead

