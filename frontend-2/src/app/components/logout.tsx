import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/app/components/ui/dialog"
  
import { Button } from "@/app/components/ui/button"
import { useLogoutUserMutation } from "@/libs/services/mutations/auth.mutation"
import { useNavigate } from "@tanstack/react-router";
  

export function LogoutDialog({ Trigger }) {

    const logoutUserMutation = useLogoutUserMutation();
    const navigate = useNavigate();

    async function handleLogout() {
        logoutUserMutation.mutate(undefined, {
            onSuccess: () => {
                navigate({
                    to: '/auth/login'
                });
            }
        })
    }

    return (
        <Dialog>
             <DialogTrigger className="w-full">
                <Trigger />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                </DialogHeader>
                <span className="text-muted-foreground">You are about to logout from this session</span>
                <DialogFooter>
                <Button variant={"destructive"} onClick={handleLogout}>Logout</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )

}