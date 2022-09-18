import axios from 'axios'

export const fetcherForSecrets = (
    url: string,
    wsUuids: string[],
    userEmail: string,
    showAll: boolean,
    showOwnedOnly: boolean,
    filterString: string,
    environments: string[] | null
) =>
    axios
        .get(url, {
            params: {
                wsUuids: JSON.stringify(wsUuids),
                userEmail: userEmail,
                showAll: showAll,
                showOwnedOnly: showOwnedOnly,
                filterString: filterString,
                environments: JSON.stringify(environments),
            },
        })
        .then((res) => res.data)

export const fetcherForApplication = (url: string, wsUuids: string[], userEmail: string | null, filterString: string) =>
    axios
        .get(url, { params: { wsUuids: JSON.stringify(wsUuids), userEmail: userEmail, filterString: filterString } })
        .then((res) => res.data)

export const fetcherForEnvironment = (url: string) => axios.get(url).then((res) => res.data)

export const fetcherForLinkToEnv = (url: string, wsUuids: string[], secretUuid: string) =>
    axios.get(url, { params: { wsUuids: JSON.stringify(wsUuids), secretUuid: secretUuid } }).then((res) => res.data)

export const fetcherForSelectEnv = (url: string, wsUuids: string[]) =>
    axios.get(url, { params: { wsUuids: JSON.stringify(wsUuids) } }).then((res) => res.data)

export const fetcherForTagDialog = (url: string) => axios.get(url).then((res) => res.data)

export const fetcherForViews = (url: string, userEmail: string) =>
    axios.get(url, { params: { userEmail: userEmail } }).then((res) => res.data)
