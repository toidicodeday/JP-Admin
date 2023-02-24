// REST API (GET, POST,  PUT, DELETE)

// PROMISE
// ASYNC & AWAIT

// FORM
// => submit dữ liệu
// => validate dữ liệu
// => hành động sau dữ liệu
// => hành động với dữ liệu lỗi

export const sendNoti = ({
    title,
    content,
}: {
    title: string;
    content: string;
}) => {
    return new Promise((resolve) => {
        // console.log(title, content);
        fetch("https://onesignal.com/api/v1/notifications", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + 'YTY5Y2JkZTItNDhjZS00NWJjLTkxYTctYzA5NTdjOWE4NWQx',
            },
            body: JSON.stringify({
                app_id: "5c202e22-f3de-457b-86b7-b2bcb3452d2b",
                headings: { en: title },
                contents: { en: content },
                included_segments: ["Subscribed Users"],
                data: { key: "value" }
            }),
        }).then((response) => {
            resolve(response.json());
        });
    });
};
