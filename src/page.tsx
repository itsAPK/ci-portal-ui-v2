"use client"

import { useState } from "react"
import { DocumentCard } from "./document-card"

const initialDocuments = [
  "Project Proposal.docx",
  "Financial Report Q2.xlsx",
  "Meeting Minutes.pdf",
  "Product Roadmap.pptx",
]

export default function DocumentList() {
  const [documents, setDocuments] = useState(initialDocuments)

  const handleDelete = (index: number) => {
    setDocuments(documents.filter((_, i) => i !== index))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Document List</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc, index) => (
          <DocumentCard
            key={index}
            documentName={doc}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>
    </div>
  )
}

