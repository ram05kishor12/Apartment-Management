import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectLabel, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select"
import  { Submit } from "../../components/Submitbutton";
export default function Setings() {
    async function handleSave(formData: FormData) {
        "use server";
        const name = formData.get("name") as string;
        const theme = formData.get("color") as string;
        

    }
    return (
        <div className="grid items-start gap-8">
            <div className="flex items-centre justify-between px-2"> 
                <div className="grid gap-1">
                    <h1 className="text-2xl md:text-4xl">Settings</h1>
                    <p className="text-md text-muted-foreground">Your Profile Settings</p>
                </div>
            </div>
            <div className="p-2">
            <Card className="p-2"> 
               <form> 
                 <CardHeader> 
                    <CardTitle> 
                        General Data
                    </CardTitle>
                    <CardDescription> 
                        Please Provide your general data
                    </CardDescription>
                 </CardHeader>
                 <CardContent> 
                   <div className="space-y-2"> 
                     <div className="space-y-1">
                        <label htmlFor="name">Name</label>
                        <Input 
                           name = "name"
                           type = "text"
                           id = "name"
                           placeholder = "Name"
                        />
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="name">Email</label>
                        <Input
                            name="email"
                            type="eamil"
                            id="email"
                            placeholder="Email"
                            disabled
                        />
                    </div>
                        <div className="space-y-1">
                        <label htmlFor="name">Theme</label>
                        <Select name="theme" defaultValue="theme-green">
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select theme"/>
                            <SelectContent> 
                                <SelectGroup> 
                                    <SelectLabel>Color</SelectLabel>
                                    <SelectItem value="theme-green">Green</SelectItem>
                                    <SelectItem value="theme-yellow">Yellow</SelectItem>
                                    <SelectItem value="theme-blue">Blue</SelectItem>
                                    <SelectItem value="theme-violet">Violet</SelectItem>
                                    <SelectItem value="theme-orange">Orange</SelectItem>
                                    <SelectItem value="theme-red">Red</SelectItem>
                                    <SelectItem value="theme-rose">Rose</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                            </SelectTrigger>
                        </Select>
                        
                    </div>
                   </div>

                 </CardContent>
                 <CardFooter>
                    <Submit />
                 </CardFooter>
               </form>
            </Card>

        </div>
        </div>
    )
}