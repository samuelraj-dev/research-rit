import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setResearchPaperStatusApi } from "../apis/research-paper.api";

export function useSetResearchPaperStatusMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { id: string, type: string }) => setResearchPaperStatusApi(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["research_papers_type"] });
        }
    })
}