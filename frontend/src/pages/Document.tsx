import { useState, useEffect } from "react";
import "./Document.scss";
import Titlebox from "../components/Titlebox";

const Document = () => {
    const [files, setFiles] = useState<any[]>([]);
    const [employee, setEmployee] = useState<any | null>(null);

    const fetchCustomers = async () => {
		try {
		  	const response = await fetch("http://localhost:3001/employees/me", {
				method: "GET",
				headers: {
				  "Content-Type": "application/json",
				  "Authorization": `Bearer ${localStorage.getItem("token")}`
				},
			});
		  	if (!response.ok) {
				throw new Error(`Erreur HTTP: ${response.status}`);
		  	}
            const data = await response.json();
            console.log(data);
            setEmployee(data);
		} catch (error) {
		  console.error("Erreur lors de l'appel API", error);
		}
	};

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setFiles([...files, {
                name: file.name,
                lastModified: file.lastModified,
                author: employee.name + employee.surname || "Unknown",
                url: fileUrl
            }]);
        }
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
    	<>
        	<Titlebox title="Document" />
            <div className="button-part">
                <form>
                    <input className="type-input" type="file" accept="application/pdf" onChange={handleFileChange} />
                </form>
            </div>
            <div className="document-list">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Document</th>
                            <th>Creation date</th>
                            <th>Author</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.map((fileObj, index) => (
                            <tr key={index}>
                                <td>
                                <a href={fileObj.url} target="_blank" rel="noreferrer">
                                    {fileObj.name}
                                </a></td>
                                <td>{new Date(fileObj.lastModified).toLocaleDateString()}</td>
                                <td>{fileObj.author || "Unknown"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
      	</>
    )
  };

export default Document;
