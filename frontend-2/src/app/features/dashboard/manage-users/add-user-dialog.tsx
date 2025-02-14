import { Button } from "@/app/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { Label } from "@/app/components/ui/label"
import { Input } from "@/app/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { useState } from "react";
import axios from "axios";
import { useCreateUserMutation } from "@/libs/services/mutations/user.mutation";

export function AddUserDialog() {

    const [prefix, setPrefix] = useState('');
  const [fullName, setFullName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState(null);
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState(null);
  const [ userDialogOpen, setUserDialogOpen ] = useState(false);

  const createUserMutation = useCreateUserMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = {
        prefix,
        fullName,
        employeeId,
        workEmail,
        dateOfJoining,
        designation,
        department,
    }

    createUserMutation.mutate(formData, {
        onSuccess: () => {
            alert('User added')
            setPrefix('')
            setFullName('')
            setEmployeeId('')
            setWorkEmail('')
            setDateOfJoining(null)
            setDesignation('')
            setDepartment(null)
            setUserDialogOpen(false);
        },
        onError: (error) => {
          alert('An error occurred while checking user activation.');
          console.error(error);
        },
      })
    }

    return (
        <Dialog open={userDialogOpen} onOpenChange={setUserDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed mr-2">
        <PlusCircle />
        {"Add User"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
        </DialogHeader>
        <form className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Prefix
            </Label>
            <Input onChange={(e) => setPrefix(e.target.value)} id="prefix" value={prefix} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Full Name
            </Label>
            <Input onChange={(e) => setFullName(e.target.value)} id="fullName" value={fullName} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Employee ID
            </Label>
            <Input onChange={(e) => setEmployeeId(e.target.value)} id="employeeId" value={employeeId} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Work Email
            </Label>
            <Input onChange={(e) => setWorkEmail(e.target.value)} id="workEmail" value={workEmail} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Date of Joining
            </Label>
            <Input type={"date"} onChange={(e) => setDateOfJoining(e.target.value)} id="dateOfJoining" value={dateOfJoining} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Designation
            </Label>
            <Input onChange={(e) => setDesignation(e.target.value)} id="designation" value={designation} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Department
            </Label>
            <Select onValueChange={(e) => setDepartment(e)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Departments</SelectLabel>
                  <SelectItem value="CSE">B.E CSE</SelectItem>
                  <SelectItem value="AIDS">B.TECH AIDS</SelectItem>
                  <SelectItem value="ECE">B.E ECE</SelectItem>
                  <SelectItem value="CCE">B.E CCE</SelectItem>
                  <SelectItem value="MECH">B.E ME</SelectItem>
                  <SelectItem value="CSBS">B.TECH CSBS</SelectItem>
                  <SelectItem value="VLSI">B.E EE (VLSI)</SelectItem>
                  <SelectItem value="BT">B.TECH BT</SelectItem>
                  <SelectItem value="AIML">B.E CSE (AIML)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

          </div>
        </form>
        <DialogFooter>
          <Button type="submit" onClick={(e) => handleSubmit(e)} disabled={createUserMutation.isPending}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    )
}