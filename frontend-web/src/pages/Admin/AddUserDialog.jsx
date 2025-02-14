import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export function AddUserDialog() {


  const [prefix, setPrefix] = useState('');
  const [fullName, setFullName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState(null);
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState(null);

  const handleSubmit = async (e) => {
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

    console.log(formData)

    try {
        const response = await axios.post('http://localhost:5000/api/users', formData, {
            withCredentials: true
          });
          if (response.status == 201) {
              toast.success("user added");
              setPrefix('')
              setFullName('')
              setEmployeeId('')
              setWorkEmail('')
              setDateOfJoining(null)
              setDesignation('')
              setDepartment(null)
          }
    } catch (error) {
        console.error('Error submitting form:', error);
        toast.error("adding failed")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add User</Button>
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
                  <SelectItem value="AIML">B.E CSE (AIML)</SelectItem>
                  <SelectItem value="AIDS">B.TECH AIDS</SelectItem>
                  <SelectItem value="MECH">B.E ME</SelectItem>
                  <SelectItem value="ECE">B.E ECE</SelectItem>
                  <SelectItem value="CCE">B.E CCE</SelectItem>
                  <SelectItem value="CSBS">B.TECH CSBS</SelectItem>
                  <SelectItem value="VLSI">B.E EE (VLSI)</SelectItem>
                  <SelectItem value="BT">B.TECH BT</SelectItem>
                  <SelectItem value="HNS">B.TECH H&S</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

          </div>
        </form>
        <DialogFooter>
          <Button type="submit" onClick={(e) => handleSubmit(e)}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
