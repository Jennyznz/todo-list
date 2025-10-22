function createForm() {
    // create column
    const projCol = document.getElementById("projects");

    // form element 
    const form = document.createElement("form");
    form.setAttribute("action", "submit");

    // form content
    form.append(create("title", "text"));
    form.append(createEntry("description"))
    // TO ADD: Due Date
    // TO ADD: isPriority

    // submit button
    const submit = document.createElement("button");
    submit.setAttribute('id', 'submit-project')
    submit.textContent = "Submit";
    form.append(button);

    // add everything to column
    projCol.append(form);
}

// Create a form entry
function createEntry(name, type) {  // TO ADD: isRequired
    const entry = document.createElement("div");

    // label
    const label = document.createElement("label");
    label.setAttribute('for', name);
    label.textContent = name.charAt(0).toUpperCase() + name.slice(1);
    entry.append(label);

    // spacing
    const brk = document.createElement("br");
    entry.append(brk);

    // text
    if (type === "text") {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', name);
        input.setAttribute('name', name);
    }

    // textarea
    if (type === "textarea") {
        const textarea = document.createElement("textarea");
        textarea.setAttribute('id', name);
        textarea.setAttribute('id', name);
    }
   
    entry.append(input);
    return entry;
}

export { createForm, createEntry };
