import { DefaultAzureCredential } from "@azure/identity"
import { BlobItem, BlobServiceClient } from "@azure/storage-blob"

const getBlobClient = (storage: string) => () => {
    const accountUrl = `https://${storage}.blob.core.windows.net`
    const credential = new DefaultAzureCredential()
    const blobServiceClient = new BlobServiceClient(accountUrl, credential)
    return blobServiceClient
}
const getContainerClient = (storage: string) => (containerName: string) => {
    const client = getBlobClient(storage)()
    return client.getContainerClient(containerName)
}
const getObjects = (storage: string) => async (containerName: string) => {
    const client = getContainerClient(storage)(containerName)
    const blobList: BlobItem[] = []
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    for await (const blob of client!.listBlobsFlat()) {
        blobList.push(blob)
    }
    return blobList
}
export const DirectBlob = (storage: string) => ({
    client: getBlobClient(storage),
    container: getContainerClient(storage),
    objects: getObjects(storage)
})