// import DataTable from "@/app/components/data-table";
import DataTable from "./data-table";
import { journalColumns, bookColumns, bookChapterColumns, conferenceColumns, patentColumns, copyrightColumns } from "./data-table/columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { useResearchPapersByTypeQuery } from "@/libs/services/queries/research-paper.query";
import { useState } from "react";

export default function UserUploadsFeature() {

  const [activeTab, setActiveTab] = useState("journal");

  const { data } = useResearchPapersByTypeQuery({ type: activeTab })

  return (
    <Tabs defaultValue="journal" className="w-full" onValueChange={(value) => setActiveTab(value)}>

      <TabsList className="mb-8">
        <TabsTrigger value="journal">Journal</TabsTrigger>
        <TabsTrigger value="book">Book</TabsTrigger>
        <TabsTrigger value="bookChapter">Book Chapter</TabsTrigger>
        <TabsTrigger value="conference">Conference</TabsTrigger>
        <TabsTrigger value="patent">Patent</TabsTrigger>
        <TabsTrigger value="copyright">Copyright</TabsTrigger>
      </TabsList>

      <TabsContent value="journal">
        <DataTable
          columns={journalColumns}
          data={activeTab === "journal" ? data?.researchPapers || [] : []}
          columnVisibilityState={{}}
        />
      </TabsContent>
      <TabsContent value="book">
        <DataTable
          columns={bookColumns}
          data={activeTab === "book" ? data?.researchPapers || [] : []}
          columnVisibilityState={{}}
        />
      </TabsContent>
      <TabsContent value="bookChapter">
        <DataTable
          columns={bookChapterColumns}
          data={activeTab === "bookChapter" ? data?.researchPapers || [] : []}
          columnVisibilityState={{}}
        />
      </TabsContent>
      <TabsContent value="conference">
        <DataTable
          columns={conferenceColumns}
          data={activeTab === "conference" ? data?.researchPapers || [] : []}
          columnVisibilityState={{}}
        />
      </TabsContent>
      <TabsContent value="patent">
        <DataTable
          columns={patentColumns}
          data={activeTab === "patent" ? data?.researchPapers || [] : []}
          columnVisibilityState={{}}
        />
      </TabsContent>
      <TabsContent value="copyright">
        <DataTable
          columns={copyrightColumns}
          data={activeTab === "copyright" ? data?.researchPapers || [] : []}
          columnVisibilityState={{}}
        />
      </TabsContent>
    </Tabs>
  )
}