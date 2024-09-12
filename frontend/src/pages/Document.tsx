import { useState, useEffect } from "react";
import "./Document.scss";

const Document = () => {
    const [files, setFiles] = useState<any[]>([]);
    const [file, setFile] = useState<any>(null);
    const [image, setImage] = useState<any>(null);
    const [customers, setCustomers] = useState<any[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const new_file = event.target.files?.[0];
        if (new_file) {
            const fileUrl = URL.createObjectURL(new_file);
            const uuid = fileUrl.split('/').pop();
            setFile({
                filename: new_file.name,
                uuid: uuid,
                shared_with: selectedCustomer.id,
            });
            setImage({
                uuid: uuid,
                scope: "document",
                image: fileUrl
            })
            console.log(file);
            console.log(image);
        }
    }

    function handleClientChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const clientId = event.target.value;
        const client = customers.find((client: any) => client.id === parseInt(clientId));
        setSelectedCustomer(client);
    }

    const postFile = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(file);
        console.log(image);
        if (file && image) {
            try {
                const response = await fetch("http://localhost:3001/documents", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify(file),
                });
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setFiles([...files, data]);
                console.log(files);
            } catch (error) {
                console.error("Erreur lors de l'appel API", error);
            }
            const formData = new FormData();
            formData.append('file', image);
            try {
                const response = await fetch("http://localhost:3001/images", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: formData,
                });
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error("Erreur lors de l'appel API", error);
            }
        }
    };

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                  const response = await fetch("http://localhost:3001/customers", {
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
                setCustomers(data);
            } catch (error) {
              console.error("Erreur lors de l'appel API", error);
            }
        };
        const fetchMe = async () => {
            try {
                  const response = await fetch("http://localhost:3001/me", {
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
                fetchDocuments(data.id);
            } catch (error) {
              console.error("Erreur lors de l'appel API", error);
            }
        };
        const fetchDocuments = async (id: number) => {
            try {
                  const response = await fetch("http://localhost:3001/documents", {
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
                const employeeDocuments = data.filter((doc: any) => doc.owner_id === id);
                setFiles(employeeDocuments);
            } catch (error) {
              console.error("Erreur lors de l'appel API", error);
            }
        };
        fetchCustomers();
        fetchMe();
    }, []);

    return (
    	<>
            <div className="button-part">
                <form onSubmit={postFile}>
                    <input className="type-input" type="file" accept="application/pdf" onChange={handleFileChange} />
                    <div className="select is-responsive">
      	        		<select onChange={handleClientChange} value={selectedCustomer?.id || ""}>
      	        			<option value="" disabled>Select client</option>
      	        			{customers.map((client: any) => (
							<option key={client.id} value={client.id}>
      	        	  			{client.name} {client.surname}
      	        			</option>
      	        			))}
      	        		</select>
      	      		</div>
                    <button type="submit">Upload</button>
                </form>
            </div>
            <div className="document-list">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Document</th>
                            <th>Shared with</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.map((fileObj, index) => (
                            <tr key={index}>
                                <td>
                                <a href={`http://localhost:3001/images/${fileObj.uuid}`} target="_blank" rel="noreferrer">
                                    {fileObj.title}
                                </a></td>
                                <td>{fileObj.shared_id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
      	</>
    )
  };

export default Document;
