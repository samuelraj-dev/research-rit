import { useEffect, useState } from "react";
import scopusLogo from '@/assets/images/scopus.png';
import vidhwanLogo from '@/assets/images/vidhwan.png';
import wosLogo from '@/assets/images/wos.png';
import googleLogo from '@/assets/images/google.png';
import orcidLogo from '@/assets/images/orcid.png';
import { useSetAcademicIdentityMutation } from "@/libs/services/mutations/academic-identity.mutation";
import { useGetAcademicIdentityQuery } from "@/libs/services/queries/academici-identity.query";

export default function AcademicIdentityFeature() {
    const [scopusId, setScopusId] = useState("");
    const [vidhwanId, setVidhwanId] = useState("");
    const [orcidId, setOrcidId] = useState("");
    const [wosId, setWosId] = useState("");
    const [googleScholarLink, setGoogleScholarLink] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const setAcademicIdentityMutation = useSetAcademicIdentityMutation();
    const getAcademicIdentityQuery = useGetAcademicIdentityQuery();

    useEffect(() => {
        console.log(getAcademicIdentityQuery.data?.academicIdentity)
        if (getAcademicIdentityQuery.data?.academicIdentity) {
            const { scopusId, vidhwanId, orcidId, wosId, googleScholarLink } = getAcademicIdentityQuery.data?.academicIdentity;
            setScopusId(scopusId || "");
            setVidhwanId(vidhwanId || "");
            setOrcidId(orcidId || "");
            setWosId(wosId || "");
            setGoogleScholarLink(googleScholarLink || "");
        }
    }, [getAcademicIdentityQuery.data]);

    if (getAcademicIdentityQuery.isLoading) return <>Loading...</>
    if (getAcademicIdentityQuery.isError) return <>Error...</>    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAcademicIdentityMutation.mutate(
            { scopusId, vidhwanId, orcidId, wosId, googleScholarLink },
            {
                onSuccess: () => {
                    alert("Updated Successfully");
                    setIsEditing(false);
                },
                onError: (error) => {
                    alert(error.message || "An error occurred while submitting the form.");
                },
            }
        )
    };

    const renderField = (label: string, value: string, setValue: any, placeholder: string, linkPrefix: string, image: string) => {
        return (
            <div className="mb-5">
                <div className="flex items-center space-x-2 mb-2">
                    <img src={image} alt={label} className="w-8 h-8 rounded-lg" />
                    <label className="block text-gray-700 pb-1">{label}</label>
                </div>
                {isEditing ? (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="p-2 border border-black rounded-md w-full"
                        placeholder={placeholder}
                        required
                    />
                ) : (
                    value ? (
                        <a 
                            href={linkPrefix ? `${linkPrefix}${value}` : value} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-black-600 underline pl-2"
                        >
                            {value}
                        </a>
                    ) : (
                        <span className="text-gray-500">Not provided</span>
                    )
                )}
            </div>
        );
    };

    return (
        <form onSubmit={handleSubmit} className="p-2">
            {renderField("Scopus ID", scopusId, setScopusId, "Scopus Id", "https://www.scopus.com/authid/detail.uri?authorId=", scopusLogo)}
            {renderField("Vidhwan ID", vidhwanId, setVidhwanId, "Vidhwan Id", "https://vidwan.inflibnet.ac.in/profile/", vidhwanLogo)}
            {renderField("Orcid ID", orcidId, setOrcidId, "Orcid Id", "https://orcid.org/", orcidLogo)}
            {renderField("WoS ID", wosId, setWosId, "WoS ID", "https://www.webofscience.com/wos/author/record/", wosLogo)}
            {renderField("Google Scholar Link", googleScholarLink, setGoogleScholarLink, "Google Scholar Link", "", googleLogo)}

            <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-2"
            >
                {isEditing ? "Cancel" : "Edit"}
            </button>

            {isEditing && (
                <button
                    type="submit"
                    className="w-full py-2 bg-green-500 mb-2 text-white rounded hover:bg-green-600"
                >
                    Update
                </button>
            )}
        </form>
    );
};