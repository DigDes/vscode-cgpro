/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_1 = require("vscode-languageserver");
// Create a connection for the server. The connection uses Node's IPC as a transport
let connection = vscode_languageserver_1.createConnection(new vscode_languageserver_1.IPCMessageReader(process), new vscode_languageserver_1.IPCMessageWriter(process));
// Create a simple text document manager. The text document manager
// supports full document sync only
let documents = new vscode_languageserver_1.TextDocuments();
// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);
// After the server has started the client sends an initialize request. The server receives
// in the passed params the rootPath of the workspace plus the client capabilities. 
let workspaceRoot;
connection.onInitialize((params) => {
    workspaceRoot = params.rootPath;
    return {
        capabilities: {
            hoverProvider: true,
            //documentHighlightProvider: true,
            // Tell the client that the server works in FULL text document sync mode
            textDocumentSync: documents.syncKind,
            // Tell the client that the server support code complete
            completionProvider: {
                resolveProvider: true
            },
            signatureHelpProvider: {
                triggerCharacters: ['(']
            }
        }
    };
});
// hold the maxNumberOfProblems setting
let maxNumberOfProblems;
// The settings have changed. Is send on server activation
// as well.
connection.onDidChangeConfiguration((change) => {
    let settings = change.settings;
    maxNumberOfProblems = settings.languageServerExample.maxNumberOfProblems || 100;
    // Revalidate any open text documents
    //documents.all().forEach(validateTextDocument);
});
function validateTextDocument(textDocument) {
    let diagnostics = [];
    let lines = textDocument.getText().split(/\r?\n/g);
    //console.log(lines);
    let problems = 0;
    for (var i = 0; i < lines.length && problems < maxNumberOfProblems; i++) {
        let line = lines[i];
        let index = line.indexOf('typescript');
        if (index >= 0) {
            problems++;
            diagnostics.push({
                severity: vscode_languageserver_1.DiagnosticSeverity.Warning,
                range: {
                    start: { line: i, character: index },
                    end: { line: i, character: index + 10 }
                },
                message: `${line.substr(index, 10)} should be spelled TypeScript`,
                source: 'ex'
            });
        }
    }
    // Send the computed diagnostics to VSCode.
    connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}
//connection.onDidChangeWatchedFiles((change) => {
// Monitored files have change in VSCode
//connection.console.log('We received an file change event');
//});
//connection.onDocumentHighlight((textDocumentPosition: TextDocumentPositionParams): DocumentHighlight[] => {
//	
//	console.log(textDocument
//	return
//});
connection.onHover((textDocumentPosition) => {
    //console.log(textDocumentPosition.position.character, textDocumentPosition.position.line);
    //console.log(textDocumentPosition.textDocument);
    //console.log(documents.get(textDocumentPosition.textDocument.uri).lineCount);
    //console.log();
    let lines = documents.get(textDocumentPosition.textDocument.uri).getText().split(/\r?\n/g);
    let line = lines[textDocumentPosition.position.line];
    return {
        //contents: line
        contents: { language: "cgpro", value: 'This function returns a true-value if the values of arg1 and arg2 are the same object or if both values are null-values or both values are true-values. In other cases the function returns a null-value.\nThe value of Same("J" + "ack","Jack") is a null-value.\nIn the following example: x = "my string";\ny = "my string";\nz = x;\ntest1 = Same(x,y);\ntest2 = Same(x,x);\ntest3 = Same(x,z); the resulting value of test1 is a null-value, while the values of test2 and test3 are true-values.' }
    };
});
connection.onSignatureHelp((textDocumentPosition) => {
    //console.log('fasdfsdfsdf');
    //switch () {
    return {
        signatures: [
            {
                label: 'Same(arg1,arg2)',
                documentation: 'This function returns a true-value if the values of arg1 and arg2 are the same object or if both values are null-values or both values are true-values. In other cases the function returns a null-value.\nThe value of Same("J" + "ack","Jack") is a null-value.\nIn the following example: x = "my string";\ny = "my string";\nz = x;\ntest1 = Same(x,y);\ntest2 = Same(x,x);\ntest3 = Same(x,z); the resulting value of test1 is a null-value, while the values of test2 and test3 are true-values.',
                parameters: [
                    { label: 'arg1', documentation: 'object' },
                    { label: 'arg2', documentation: 'object' }
                ]
            }
        ],
        activeSignature: 0,
        activeParameter: 1
        //range : {
        //   start : {line: 0, character: 0},
        //    end : {line: 0, character: 10}
        //}
    };
});
// This handler provides the initial list of the completion items.
connection.onCompletion((textDocumentPosition) => {
    // The pass parameter contains the position of the text document in 
    // which code complete got requested. For the example we ignore this
    // info and always provide the same completion items.
    return [
        { label: 'Same', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 1 },
        { label: 'Copy', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 2 },
        { label: 'Length', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 3 },
        { label: 'Min', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 4 },
        { label: 'Max', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 5 },
        { label: 'Void', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 6 },
        { label: 'ProcCall', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 7 },
        { label: 'FuncCall', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 8 },
        { label: 'ObjectClass', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 9 },
        { label: 'IsString', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 10 },
        { label: 'String', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 11 },
        { label: 'Substring', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 12 },
        { label: 'FindSubstring', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 13 },
        { label: 'Range', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 14 },
        { label: 'EOL', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 15 },
        { label: 'CRLF', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 16 },
        { label: 'ToUpperCase', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 17 },
        { label: 'ToLowerCase', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 18 },
        { label: 'IsDigit', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 19 },
        { label: 'IsWhiteSpaces', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 20 },
        { label: 'FindRegEx', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 21 },
        { label: 'EmailDomainPart', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 22 },
        { label: 'EmailUserPart', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 23 },
        { label: 'IsNumber', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 24 },
        { label: 'Number', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 25 },
        { label: 'RandomNumber', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 26 },
        { label: 'IsDate', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 27 },
        { label: 'Date', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 28 },
        { label: 'GMTTime', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 29 },
        { label: 'LocalTime', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 30 },
        { label: 'GMTToLocal', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 31 },
        { label: 'LocalToGMT', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 32 },
        { label: 'Year', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 33 },
        { label: 'Month', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 34 },
        { label: 'MonthNum', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 35 },
        { label: 'MonthDay', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 36 },
        { label: 'WeekDay', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 37 },
        { label: 'YearDay', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 38 },
        { label: 'TimeOfDay', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 39 },
        { label: 'DateNumber', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 40 },
        { label: 'DateByMonthDay', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 41 },
        { label: 'DateByYearDay', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 42 },
        { label: 'IsIPAddress', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 43 },
        { label: 'IPAddress', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 44 },
        { label: 'IsData', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 45 },
        { label: 'RandomData', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 46 },
        { label: 'EmptyData', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 47 },
        { label: 'IsArray', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 48 },
        { label: 'NewArray', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 49 },
        { label: 'Invert', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 50 },
        { label: 'Find', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 51 },
        { label: 'AddElement', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 52 },
        { label: 'RemoveElement', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 53 },
        { label: 'InsertElement', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 54 },
        { label: 'SortStrings', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 55 },
        { label: 'IsDictionary', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 56 },
        { label: 'NewDictionary', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 57 },
        { label: 'SetCaseSensitive', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 58 },
        { label: 'IsXML', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 59 },
        { label: 'NewXML', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 60 },
        { label: 'SetNamespace', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 61 },
        { label: 'GetNamespace', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 62 },
        { label: 'GetPrefix', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 63 },
        { label: 'SetAttribute', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 64 },
        { label: 'GetAttribute', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 65 },
        { label: 'XMLBody', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 66 },
        { label: 'XMLType', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 67 },
        { label: 'XMLPrefix', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 68 },
        { label: 'ObjectToString', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 69 },
        { label: 'ObjectToXML', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 70 },
        { label: 'ToObject', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 71 },
        { label: 'Base64Encode', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 72 },
        { label: 'Base64Decode', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 73 },
        { label: 'AppToXML', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 74 },
        { label: 'XMLToApp', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 75 },
        { label: 'ObjectToJSON', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 76 },
        { label: 'JSONToObject', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 77 },
        { label: 'Convert', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 78 },
        { label: 'SystemInfo', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 79 },
        { label: 'CryDigest', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 80 },
        { label: 'CryEncrypt', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 81 },
        { label: 'CryDecrypt', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 82 },
        { label: 'Vars', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 83 },
        { label: 'SIPURIToEmail', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 84 },
        { label: 'EmailToSIPURI', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 85 },
        { label: 'PhoneNumberToSIPURI', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 86 },
        { label: 'RouteAddress', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 87 },
        { label: 'RouteENUM', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 88 },
        { label: 'MyDomain', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 89 },
        { label: 'MyEmail', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 90 },
        { label: 'GetAccountPreferences', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 91 },
        { label: 'SetAccountPreferences', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 92 },
        { label: 'Impersonate', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 93 },
        { label: 'ReadGroupMembers', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 94 },
        { label: 'ReadTelnums', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 95 },
        { label: 'UpdateAccountMailRule', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 96 },
        { label: 'UpdateAccountSignalRule', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 97 },
        { label: 'ListMailboxes', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 98 },
        { label: 'CreateMailbox', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 99 },
        { label: 'RenameMailbox', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 100 },
        { label: 'DeleteMailbox', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 101 },
        { label: 'GetMailboxACLs', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 102 },
        { label: 'SetMailboxACLs', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 103 },
        { label: 'GetMailboxAliases', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 104 },
        { label: 'SetMailboxAliases', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 105 },
        { label: 'GetMailboxSubscription', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 106 },
        { label: 'SetMailboxSubscription', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 107 },
        { label: 'OpenMailbox', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 108 },
        { label: 'OpenMailboxView', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 109 },
        { label: 'MailboxUIDs', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 110 },
        { label: 'SubscribeEvents', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 111 },
        { label: 'IsMailboxNotifyEvent', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 112 },
        { label: 'Sync', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 113 },
        { label: 'MailboxInternalTimeByUID', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 114 },
        { label: 'MailboxFlagsByUID', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 115 },
        { label: 'MailboxOrigUIDByUID', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 116 },
        { label: 'MailboxUIDByOrigUID', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 117 },
        { label: 'MailboxSetFlags', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 118 },
        { label: 'MailboxExpunge', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 119 },
        { label: 'MailboxAudioByUID', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 120 },
        { label: 'MailboxRedirectByUID', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 121 },
        { label: 'MailboxForwardByUID', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 122 },
        { label: 'MailboxAppend', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 123 },
        { label: 'MailboxCopy', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 124 },
        { label: 'GetMessageAttr', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 125 },
        { label: 'UpdateMessageAttr', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 126 },
        { label: 'OpenMessage', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 127 },
        { label: 'MessagePart', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 128 },
        { label: 'MessageHeader', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 129 },
        { label: 'MessageBody', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 130 },
        { label: 'OpenCalendar', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 131 },
        { label: 'Find', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 132 },
        { label: 'ProcessCalendar', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 133 },
        { label: 'ReadStorageFile', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 134 },
        { label: 'WriteStorageFile', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 135 },
        { label: 'AppendStorageFile', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 136 },
        { label: 'DeleteStorageFile', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 137 },
        { label: 'RenameStorageFile', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 138 },
        { label: 'CreateStorageDirectory', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 139 },
        { label: 'RenameStorageDirectory', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 140 },
        { label: 'DeleteStorageDirectory', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 141 },
        { label: 'ListStorageFiles', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 142 },
        { label: 'ReadStorageFileAttr', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 143 },
        { label: 'WriteStorageFileAttr', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 144 },
        { label: 'LockStorageFile', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 145 },
        { label: 'ReadRoster', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 146 },
        { label: 'SetRoster', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 147 },
        { label: 'DatasetList', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 148 },
        { label: 'DatasetCreate', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 149 },
        { label: 'DatasetRemove', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 150 },
        { label: 'DatasetSet', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 151 },
        { label: 'DatasetDelete', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 152 },
        { label: 'DirectorySearch', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 153 },
        { label: 'GetLanguage', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 154 },
        { label: 'SetLanguage', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 155 },
        { label: 'GetTimeZoneName', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 156 },
        { label: 'SetTimeZone', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 157 },
        { label: 'ReadEnvirFile', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 158 },
        { label: 'SysLog', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 159 },
        { label: 'SysProfile', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 160 },
        { label: 'ExecuteCLI', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 161 },
        { label: 'SetApplicationStatus', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 162 },
        { label: 'StoreCDR', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 163 },
        { label: 'DoBalance', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 164 },
        { label: 'Statistics', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 165 },
        { label: 'BannerRead', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 166 },
        { label: 'HTTPCall', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 167 },
        { label: 'SubmitEMail', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 168 },
        { label: 'SendEMail', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 169 },
        { label: 'SendInstantMessage', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 170 },
        { label: 'SendXMPPIQ', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 171 },
        { label: 'RADIUSCall', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 172 },
        { label: 'ThisTask', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 173 },
        { label: 'IsTask', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 174 },
        { label: 'SendEvent', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 175 },
        { label: 'ReadInput', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 176 },
        { label: 'CreateMeeting', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 177 },
        { label: 'ActivateMeeting', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 178 },
        { label: 'DeactivateMeeting', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 179 },
        { label: 'RemoveMeeting', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 180 },
        { label: 'FindMeeting', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 181 },
        { label: 'ClearMeeting', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 182 },
        { label: 'Enqueue', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 183 },
        { label: 'CheckQueue', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 184 },
        { label: 'Dequeue', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 185 },
        { label: 'ReadQueue', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 186 },
        { label: 'ReadInput', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 187 },
        { label: 'IsDisconnectEvent', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 188 },
        { label: 'AcceptCall', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 189 },
        { label: 'RedirectCall', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 190 },
        { label: 'ForkCall', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 191 },
        { label: 'ProvisionCall', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 192 },
        { label: 'ProvisionCall', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 193 },
        { label: 'RejectCall', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 194 },
        { label: 'SetCallParameters', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 195 },
        { label: 'StartCall', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 196 },
        { label: 'IsCallProvisionEvent', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 197 },
        { label: 'IsCallCompletedEvent', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 198 },
        { label: 'CancelCall', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 199 },
        { label: 'Disconnect', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 200 },
        { label: 'IsConnected', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 201 },
        { label: 'IsHalfConnected', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 202 },
        { label: 'RemoteURI', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 203 },
        { label: 'LocalURI', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 204 },
        { label: 'IncomingRequestURI', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 205 },
        { label: 'RouteLocalURI', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 206 },
        { label: 'RemoteIPAddress', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 207 },
        { label: 'RemoteAuthentication', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 208 },
        { label: 'PendingRequestData', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 209 },
        { label: 'PendingRequestExData', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 210 },
        { label: 'SetLocalContactParameter', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 211 },
        { label: 'DTMF', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 212 },
        { label: 'ClearDTMF', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 213 },
        { label: 'SetInterruptOnDTMF', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 214 },
        { label: 'SendDTMF', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 215 },
        { label: 'PlayFile', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 216 },
        { label: 'Play', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 217 },
        { label: 'PlayTone', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 218 },
        { label: 'GetPlayPosition', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 219 },
        { label: 'SetPlayPosition', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 220 },
        { label: 'IsPlayCompleted', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 221 },
        { label: 'Record', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 222 },
        { label: 'SetLocalHold', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 223 },
        { label: 'ReleaseMediaChannel', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 224 },
        { label: 'MediaOption', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 225 },
        { label: 'StartBridge', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 226 },
        { label: 'IsStartBridgeEvent', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 227 },
        { label: 'RejectBridge', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 228 },
        { label: 'AcceptBridge', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 229 },
        { label: 'BreakBridge', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 230 },
        { label: 'IsBreakBridgeEvent', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 231 },
        { label: 'AttachMixer', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 232 },
        { label: 'DetachMixer', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 233 },
        { label: 'MixerAttached', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 234 },
        { label: 'MuteMixer', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 235 },
        { label: 'StartBridgedCall', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 236 },
        { label: 'TransferSupported', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 237 },
        { label: 'IsCallTransferredEvent', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 238 },
        { label: 'TransferCall', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 239 },
        { label: 'StartTransfer', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 240 },
        { label: 'IsStartTransferEvent', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 241 },
        { label: 'RejectTransfer', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 242 },
        { label: 'AcceptTransfer', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 243 },
        { label: 'SendCallInfo', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 244 },
        { label: 'IsCallInfoEvent', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 245 },
        { label: 'SendCallOptions', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 246 },
        { label: 'SignalOption', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 247 },
        { label: 'SendCallNotify', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 248 },
        { label: 'IsInstantMessageEvent', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 249 },
        { label: 'IsXMPPIQEvent', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 250 },
        { label: 'GetHTTPParameter', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 251 },
        { label: 'GetHTTPBinaryParameter', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 252 },
        { label: 'GetHTTPField', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 253 },
        { label: 'GetHTTPQuery', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 254 },
        { label: 'GetHTTPResource', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 255 },
        { label: 'GetHTTPMethod', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 256 },
        { label: 'GetHTTPType', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 257 },
        { label: 'GetHTTPSubtype', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 258 },
        { label: 'GetHTTPData', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 259 },
        { label: 'SetHTTPResponseData', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 260 },
        { label: 'SetHTTPResponseType', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 261 },
        { label: 'SetHTTPResponseCode', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 262 },
        { label: 'RemoteIPAddress', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 263 },
        { label: 'ProxiedIPAddress', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 264 },
        { label: 'SendHTTPContinue', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 265 },
        { label: 'AddHTTPResponseField', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 266 },
        { label: 'ProcessWSSP', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 267 },
        { label: 'SessionData', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 268 },
        { label: 'LISTDOMAINS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 269 },
        { label: 'MAINDOMAINNAME', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 270 },
        { label: 'GETDOMAINDEFAULTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 271 },
        { label: 'UPDATEDOMAINDEFAULTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 272 },
        { label: 'SETDOMAINDEFAULTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 273 },
        { label: 'GETCLUSTERDOMAINDEFAULTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 274 },
        { label: 'UPDATECLUSTERDOMAINDEFAULTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 275 },
        { label: 'SETCLUSTERDOMAINDEFAULTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 276 },
        { label: 'GETSERVERACCOUNTDEFAULTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 277 },
        { label: 'UPDATESERVERACCOUNTDEFAULTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 278 },
        { label: 'SETSERVERACCOUNTDEFAULTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 279 },
        { label: 'GETCLUSTERACCOUNTDEFAULTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 280 },
        { label: 'UPDATECLUSTERACCOUNTDEFAULTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 281 },
        { label: 'SETCLUSTERACCOUNTDEFAULTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 282 },
        { label: 'GETSERVERACCOUNTPREFS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 283 },
        { label: 'SETSERVERACCOUNTPREFS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 284 },
        { label: 'UPDATESERVERACCOUNTPREFS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 285 },
        { label: 'GETCLUSTERACCOUNTPREFS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 286 },
        { label: 'SETCLUSTERACCOUNTPREFS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 287 },
        { label: 'UPDATECLUSTERACCOUNTPREFS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 288 },
        { label: 'CREATEDOMAIN', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 289 },
        { label: 'RENAMEDOMAIN', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 290 },
        { label: 'DELETEDOMAIN', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 291 },
        { label: 'CREATEDIRECTORYDOMAIN', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 292 },
        { label: 'RELOADDIRECTORYDOMAINS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 293 },
        { label: 'LISTSERVERTELNUMS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 294 },
        { label: 'LISTCLUSTERTELNUMS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 295 },
        { label: 'GETSERVERTRUSTEDCERTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 296 },
        { label: 'SETSERVERTRUSTEDCERTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 297 },
        { label: 'GETCLUSTERTRUSTEDCERTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 298 },
        { label: 'SETCLUSTERTRUSTEDCERTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 299 },
        { label: 'GETDIRECTORYINTEGRATION', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 300 },
        { label: 'SETDIRECTORYINTEGRATION', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 301 },
        { label: 'GETCLUSTERDIRECTORYINTEGRATION', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 302 },
        { label: 'SETCLUSTERDIRECTORYINTEGRATION', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 303 },
        { label: 'CREATEDOMAINSTORAGE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 304 },
        { label: 'LISTDOMAINSTORAGE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 305 },
        { label: 'GETDOMAINSETTINGS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 306 },
        { label: 'GETDOMAINEFFECTIVESETTINGS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 307 },
        { label: 'UPDATEDOMAINSETTINGS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 308 },
        { label: 'GETACCOUNTDEFAULTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 309 },
        { label: 'UPDATEACCOUNTDEFAULTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 310 },
        { label: 'GETACCOUNTDEFAULTPREFS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 311 },
        { label: 'SETACCOUNTDEFAULTPREFS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 312 },
        { label: 'UPDATEACCOUNTDEFAULTPREFS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 313 },
        { label: 'GETACCOUNTTEMPLATE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 314 },
        { label: 'UPDATEACCOUNTTEMPLATE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 315 },
        { label: 'GETDOMAINALIASES', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 316 },
        { label: 'GETDOMAINMAILRULES', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 317 },
        { label: 'SETDOMAINMAILRULES', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 318 },
        { label: 'GETDOMAINSIGNALRULES', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 319 },
        { label: 'SETDOMAINSIGNALRULES', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 320 },
        { label: 'LISTADMINDOMAINS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 321 },
        { label: 'LISTDOMAINOBJECTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 322 },
        { label: 'LISTACCOUNTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 323 },
        { label: 'LISTDOMAINTELNUMS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 324 },
        { label: 'INSERTDIRECTORYRECORDS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 325 },
        { label: 'DELETEDIRECTORYRECORDS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 326 },
        { label: 'CREATEACCOUNTSTORAGE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 327 },
        { label: 'LISTACCOUNTSTORAGE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 328 },
        { label: 'SETDOMAINALIASES', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 329 },
        { label: 'SETDOMAINSETTINGS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 330 },
        { label: 'SETACCOUNTDEFAULTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 331 },
        { label: 'SETACCOUNTTEMPLATE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 332 },
        { label: 'GETDOMAINLOCATION', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 333 },
        { label: 'SUSPENDDOMAIN', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 334 },
        { label: 'RESUMEDOMAIN', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 335 },
        { label: 'CREATEACCOUNT', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 336 },
        { label: 'RENAMEACCOUNT', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 337 },
        { label: 'DELETEACCOUNT', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 338 },
        { label: 'SETACCOUNTTYPE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 339 },
        { label: 'GETACCOUNTSETTINGS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 340 },
        { label: 'UPDATEACCOUNTSETTINGS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 341 },
        { label: 'GETACCOUNTEFFECTIVESETTINGS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 342 },
        { label: 'SETACCOUNTPASSWORD', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 343 },
        { label: 'VERIFYACCOUNTPASSWORD', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 344 },
        { label: 'GETACCOUNTALIASES', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 345 },
        { label: 'SETACCOUNTALIASES', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 346 },
        { label: 'GETACCOUNTTELNUMS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 347 },
        { label: 'SETACCOUNTTELNUMS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 348 },
        { label: 'MODIFYACCOUNTTELNUMS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 349 },
        { label: 'GETACCOUNTMAILRULES', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 350 },
        { label: 'SETACCOUNTMAILRULES', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 351 },
        { label: 'GETACCOUNTSIGNALRULES', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 352 },
        { label: 'SETACCOUNTSIGNALRULES', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 353 },
        { label: 'UPDATEACCOUNTMAILRULE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 354 },
        { label: 'UPDATEACCOUNTSIGNALRULE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 355 },
        { label: 'GETACCOUNTRPOPS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 356 },
        { label: 'SETACCOUNTRPOPS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 357 },
        { label: 'GETACCOUNTRSIPS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 358 },
        { label: 'SETACCOUNTRSIPS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 359 },
        { label: 'UPDATESCHEDULEDTASK', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 360 },
        { label: 'GETACCOUNTRIGHTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 361 },
        { label: 'GETACCOUNTINFO', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 362 },
        { label: 'GETACCOUNTPREFS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 363 },
        { label: 'UPDATEACCOUNTPREFS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 364 },
        { label: 'SETACCOUNTPREFS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 365 },
        { label: 'GETACCOUNTEFFECTIVEPREFS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 366 },
        { label: 'KILLACCOUNTSESSIONS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 367 },
        { label: 'GETACCOUNTACL', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 368 },
        { label: 'SETACCOUNTACL', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 369 },
        { label: 'GETACCOUNTACLRIGHTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 370 },
        { label: 'SETACCOUNTSETTINGS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 371 },
        { label: 'GETACCOUNTLOCATION', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 372 },
        { label: 'GETACCOUNTPRESENCE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 373 },
        { label: 'LISTGROUPS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 374 },
        { label: 'CREATEGROUP', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 375 },
        { label: 'RENAMEGROUP', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 376 },
        { label: 'DELETEGROUP', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 377 },
        { label: 'GETGROUP', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 378 },
        { label: 'SETGROUP', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 379 },
        { label: 'LISTFORWARDERS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 380 },
        { label: 'CREATEFORWARDER', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 381 },
        { label: 'RENAMEFORWARDER', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 382 },
        { label: 'DELETEFORWARDER', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 383 },
        { label: 'GETFORWARDER', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 384 },
        { label: 'FINDFORWARDERS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 385 },
        { label: 'LISTDOMAINNAMEDTASKS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 386 },
        { label: 'LISTACCOUNTNAMEDTASKS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 387 },
        { label: 'CREATENAMEDTASK', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 388 },
        { label: 'RENAMENAMEDTASK', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 389 },
        { label: 'DELETENAMEDTASK', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 390 },
        { label: 'GETNAMEDTASK', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 391 },
        { label: 'UPDATENAMEDTASK', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 392 },
        { label: 'SETACCOUNTRIGHTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 393 },
        { label: 'LISTMAILBOXES', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 394 },
        { label: 'CREATEMAILBOX', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 395 },
        { label: 'DELETEMAILBOX', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 396 },
        { label: 'RENAMEMAILBOX', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 397 },
        { label: 'GETMAILBOXINFO', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 398 },
        { label: 'GETMAILBOXACL', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 399 },
        { label: 'SETMAILBOXACL', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 400 },
        { label: 'GETMAILBOXRIGHTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 401 },
        { label: 'SETMAILBOXCLASS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 402 },
        { label: 'GETMAILBOXSUBSCRIPTION', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 403 },
        { label: 'SETMAILBOXSUBSCRIPTION', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 404 },
        { label: 'GETMAILBOXALIASES', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 405 },
        { label: 'SETMAILBOXALIASES', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 406 },
        { label: 'GETDOMAINALERTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 407 },
        { label: 'SETDOMAINALERTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 408 },
        { label: 'POSTDOMAINALERT', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 409 },
        { label: 'REMOVEDOMAINALERT', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 410 },
        { label: 'GETACCOUNTALERTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 411 },
        { label: 'SETACCOUNTALERTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 412 },
        { label: 'POSTACCOUNTALERT', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 413 },
        { label: 'REMOVEACCOUNTALERT', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 414 },
        { label: 'GETSERVERALERTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 415 },
        { label: 'SETSERVERALERTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 416 },
        { label: 'POSTSERVERALERT', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 417 },
        { label: 'REMOVESERVERALERT', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 418 },
        { label: 'GETCLUSTERALERTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 419 },
        { label: 'SETCLUSTERALERTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 420 },
        { label: 'POSTCLUSTERALERT', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 421 },
        { label: 'REMOVECLUSTERALERT', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 422 },
        { label: 'READSTORAGEFILE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 423 },
        { label: 'WRITESTORAGEFILE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 424 },
        { label: 'RENAMESTORAGEFILE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 425 },
        { label: 'DELETESTORAGEFILE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 426 },
        { label: 'LISTSTORAGEFILES', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 427 },
        { label: 'GETSTORAGEFILEINFO', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 428 },
        { label: 'READSTORAGEFILEATTR', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 429 },
        { label: 'UPDATESTORAGEFILEATTR', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 430 },
        { label: 'GETFILESUBSCRIPTION', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 431 },
        { label: 'SETFILESUBSCRIPTION', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 432 },
        { label: 'LISTLISTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 433 },
        { label: 'GETDOMAINLISTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 434 },
        { label: 'GETACCOUNTLISTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 435 },
        { label: 'CREATELIST', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 436 },
        { label: 'RENAMELIST', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 437 },
        { label: 'DELETELIST', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 438 },
        { label: 'GETLIST', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 439 },
        { label: 'UPDATELIST', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 440 },
        { label: 'LIST', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 441 },
        { label: 'LISTSUBSCRIBERS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 442 },
        { label: 'READSUBSCRIBERS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 443 },
        { label: 'GETSUBSCRIBERINFO', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 444 },
        { label: 'SETPOSTINGMODE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 445 },
        { label: 'PROCESSBOUNCE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 446 },
        { label: 'LISTDOMAINSKINS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 447 },
        { label: 'CREATEDOMAINSKIN', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 448 },
        { label: 'RENAMEDOMAINSKIN', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 449 },
        { label: 'DELETEDOMAINSKIN', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 450 },
        { label: 'LISTDOMAINSKINFILES', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 451 },
        { label: 'READDOMAINSKINFILE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 452 },
        { label: 'STOREDOMAINSKINFILE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 453 },
        { label: 'LISTSERVERSKINS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 454 },
        { label: 'CREATESERVERSKIN', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 455 },
        { label: 'RENAMESERVERSKIN', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 456 },
        { label: 'DELETESERVERSKIN', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 457 },
        { label: 'LISTSERVERSKINFILES', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 458 },
        { label: 'READSERVERSKINFILE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 459 },
        { label: 'STORESERVERSKINFILE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 460 },
        { label: 'LISTCLUSTERSKINS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 461 },
        { label: 'LISTCLUSTERSKINFILES', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 462 },
        { label: 'LISTSTOCKSKINFILES', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 463 },
        { label: 'CREATEWEBUSERSESSION', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 464 },
        { label: 'CREATEXIMSSSESSION', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 465 },
        { label: 'FINDACCOUNTSESSION', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 466 },
        { label: 'LISTACCOUNTSESSIONS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 467 },
        { label: 'GETSESSION', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 468 },
        { label: 'KILLSESSION', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 469 },
        { label: 'CREATEDOMAINPBX', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 470 },
        { label: 'DELETEDOMAINPBX', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 471 },
        { label: 'LISTDOMAINPBXFILES', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 472 },
        { label: 'READDOMAINPBXFILE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 473 },
        { label: 'STOREDOMAINPBXFILE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 474 },
        { label: 'CREATESERVERPBX', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 475 },
        { label: 'DELETESERVERPBX', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 476 },
        { label: 'LISTSERVERPBXFILES', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 477 },
        { label: 'READSERVERPBXFILE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 478 },
        { label: 'STORESERVERPBXFILE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 479 },
        { label: 'CREATECLUSTERPBX', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 480 },
        { label: 'LISTSTOCKPBXFILES', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 481 },
        { label: 'STARTPBXTASK', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 482 },
        { label: 'SENDTASKEVENT', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 483 },
        { label: 'KILLNODE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 484 },
        { label: 'READNODESTATUS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 485 },
        { label: 'REMOVEACCOUNTSUBSET', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 486 },
        { label: 'DATASET', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 487 },
        { label: 'ROSTER', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 488 },
        { label: 'BALANCE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 489 },
        { label: 'LISTMODULES', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 490 },
        { label: 'GETMODULE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 491 },
        { label: 'SETMODULE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 492 },
        { label: 'UPDATEMODULE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 493 },
        { label: 'GETQUEUESETTINGS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 494 },
        { label: 'SETQUEUESETTINGS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 495 },
        { label: 'GETSIGNALSETTINGS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 496 },
        { label: 'SETSIGNALSETTINGS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 497 },
        { label: 'GETMEDIASERVERSETTINGS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 498 },
        { label: 'SETMEDIASERVERSETTINGS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 499 },
        { label: 'GETSESSIONSETTINGS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 500 },
        { label: 'SETSESSIONSETTINGS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 501 },
        { label: 'GETCLUSTERSETTINGS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 502 },
        { label: 'SETCLUSTERSETTINGS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 503 },
        { label: 'GETLOGSETTINGS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 504 },
        { label: 'UPDATELOGSETTINGS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 505 },
        { label: 'GETNETWORK', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 506 },
        { label: 'SETNETWORK', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 507 },
        { label: 'GETDNRSETTINGS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 508 },
        { label: 'SETDNRSETTINGS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 509 },
        { label: 'GETBANNED', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 510 },
        { label: 'SETBANNED', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 511 },
        { label: 'GETCLUSTERNETWORK', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 512 },
        { label: 'GETCLUSTERBANNED', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 513 },
        { label: 'GETSERVERMAILRULES', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 514 },
        { label: 'SETSERVERMAILRULES', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 515 },
        { label: 'GETSERVERSIGNALRULES', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 516 },
        { label: 'SETSERVERSIGNALRULES', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 517 },
        { label: 'GETCLUSTERMAILRULES', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 518 },
        { label: 'GETROUTERTABLE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 519 },
        { label: 'SETROUTERTABLE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 520 },
        { label: 'GETROUTERSETTINGS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 521 },
        { label: 'SETROUTERSETTINGS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 522 },
        { label: 'GETCLUSTERROUTERTABLE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 523 },
        { label: 'GETSERVERSETTINGS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 524 },
        { label: 'UPDATESERVERSETTINGS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 525 },
        { label: 'REFRESHOSDATA', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 526 },
        { label: 'GETLANIPS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 527 },
        { label: 'SETLANIPS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 528 },
        { label: 'GETCLUSTERLANIPS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 529 },
        { label: 'SETCLUSTERLANIPS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 530 },
        { label: 'GETCLIENTIPS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 531 },
        { label: 'GETBLACKLISTEDIPS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 532 },
        { label: 'GETWHITEHOLEIPS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 533 },
        { label: 'GETNATEDIPS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 534 },
        { label: 'GETNATSITEIPS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 535 },
        { label: 'GETDEBUGIPS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 536 },
        { label: 'GETDENIEDIPS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 537 },
        { label: 'ROUTE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 538 },
        { label: 'GETIPSTATE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 539 },
        { label: 'GETSERVERINTERCEPT', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 540 },
        { label: 'SETSERVERINTERCEPT', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 541 },
        { label: 'GETCLUSTERINTERCEPT', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 542 },
        { label: 'GETSTATELEMENT', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 543 },
        { label: 'SETSTATELEMENT', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 544 },
        { label: 'GETNEXTSTATNAME', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 545 },
        { label: 'GETDIALOGINFO', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 546 },
        { label: 'SHUTDOWN', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 547 },
        { label: 'GETACCOUNTSTAT', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 548 },
        { label: 'RESETACCOUNTSTAT', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 549 },
        { label: 'GETDOMAINSTAT', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 550 },
        { label: 'RESETDOMAINSTAT', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 551 },
        { label: 'LISTDIRECTORYUNITS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 552 },
        { label: 'CREATEDIRECTORYUNIT', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 553 },
        { label: 'RELOCATEDIRECTORYUNIT', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 554 },
        { label: 'DELETEDIRECTORYUNIT', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 555 },
        { label: 'GETDIRECTORYUNIT', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 556 },
        { label: 'SETDIRECTORYUNIT', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 557 },
        { label: 'GETDIRECTORYACCESSRIGHTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 558 },
        { label: 'SETDIRECTORYACCESSRIGHTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 559 },
        { label: 'LISTCLICOMMANDS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 560 },
        { label: 'NOOP', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 561 },
        { label: 'ECHO', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 562 },
        { label: 'GETVERSION', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 563 },
        { label: 'GETSYSTEMINFO', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 564 },
        { label: 'GETCURRENTTIME', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 565 },
        { label: 'SETLOGALL', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 566 },
        { label: 'DUMPALLOBJECTS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 567 },
        { label: 'TESTLOOP', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 568 },
        { label: 'SETTRACE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 569 },
        { label: 'WRITELOG', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 570 },
        { label: 'RELEASESMTPQUEUE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 571 },
        { label: 'REJECTQUEUEMESSAGE', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 572 },
        { label: 'REJECTQUEUEMESSAGES', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 573 },
        { label: 'GETMESSAGEQUEUEINFO', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 574 },
        { label: 'GETCURRENTCONTROLLER', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 575 },
        { label: 'RECONNECTCLUSTERADMIN', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 576 },
        { label: 'GETTEMPCLIENTIPS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 577 },
        { label: 'TEMPBLACKLISTIP', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 578 },
        { label: 'GETTEMPBLACKLISTEDIPS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 579 },
        { label: 'SETTEMPBLACKLISTEDIPS', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 580 }
    ];
});
// This handler resolve additional information for the item selected in
// the completion list.
connection.onCompletionResolve((item) => {
    switch (item.data) {
        case 1: {
            item.detail = '(CG/PL) Same(arg1,arg2)';
            item.documentation = 'This function returns a true-value if the values of arg1 and arg2 are the same object or if both values are null-values or both values are true-values. In other cases the function returns a null-value.\nThe value of Same("J" + "ack","Jack") is a null-value.\nIn the following example: x = "my string";\ny = "my string";\nz = x;\ntest1 = Same(x,y);\ntest2 = Same(x,x);\ntest3 = Same(x,z); the resulting value of test1 is a null-value, while the values of test2 and test3 are true-values.';
            break;
        }
        case 2: {
            item.detail = '(CG/PL) Copy(arg)';
            item.documentation = 'If the arg value is a null-value, this function returns a null-value.\nOtherwise, the function returns the copy of the arg value.\nFor complex objects (such as arrays, dictionaries, XML objects), this function copies all complex object elements, too.';
            break;
        }
        case 3: {
            item.detail = '(CG/PL) Length(arg)';
            item.documentation = 'If arg is a string, this function returns the string size (in bytes);\nIf arg is a datablock, this function returns the datablock size (in bytes);\nIf arg is an array, this function returns the number of array elements;\nIf arg is a dictionary, this function returns the number of dictionary keys;\nIf arg is a Mailbox handle, this function returns the number of messages in the Mailbox;\nIn all other cases, this function returns the number 0.';
            break;
        }
        case 4: {
            item.detail = '(CG/PL) Min(arg1,arg2)';
            item.documentation = 'If the arg1 value < the arg2 value, then the function returns the arg1 value, otherwise it returns the arg2 value.\nSee above for the < operation definition.';
            break;
        }
        case 5: {
            item.detail = '(CG/PL) Max(arg1,arg2)';
            item.documentation = 'If the arg1 value > the arg2 value, then the function returns the arg1 value, otherwise it returns the arg2 value.\nSee above for the > operation definition.';
            break;
        }
        case 6: {
            item.detail = '(CG/PL) Void(arg1)';
            item.documentation = 'This procedure does nothing, it just discards the arg1 value. Use this procedure when you need to call a function, but you do not want to use the function result.';
            break;
        }
        case 7: {
            item.detail = '(CG/PL) ProcCall(name)\nProcCall(name,arg1)\nProcCall(name,arg1,arg2)\nProcCall(name,arg1,....)';
            item.documentation = 'This procedure has 1 or more parameters. The name value should be a string, it specifies a simple or a qualified external procedure name. \nThis external procedure is called, using the remaining parameters as its parameters. \nThere is no need to use external-declarations for procedures called this way. ProcCall("myModule::myProc",123,"2222"); is the same as procedure myModule::myProc(x,y) external; \nmyModule::myProc(123,"2222");';
            break;
        }
        case 8: {
            item.detail = '(CG/PL) FuncCall(name)\nFuncCall(name,arg1)\nFuncCall(name,arg1,arg2)\nFuncCall(name,arg1,....)';
            item.documentation = 'This function has 1 or more parameters. The name value should be a string, it specifies a simple or a qualified external function name. \nThis external function is called, using the remaining parameters as its parameters. \nThere is no need to use external-declarations for functions called this way. x = FuncCall("myModule::myFunc",123,"2222"); is the same as function myModule::myFunc(x,y) external; \nx = myModule::myFunc(123,"2222");';
            break;
        }
        case 9: {
            item.detail = '(CG/PL) ObjectClass(arg)';
            item.documentation = 'This function returns a string with the name of the class the arg value belongs to ("STString" for strings, "STNumber" for numbers, "STDate" for timestamps, "STData" for datablocks, etc.)';
            break;
        }
        case 10: {
            item.detail = '(CG/PL) IsString(arg)';
            item.documentation = 'This function returns a true-value if the arg value is a string, otherwise the function returns a null-value.';
            break;
        }
        case 11: {
            item.detail = '(CG/PL) String(arg)';
            item.documentation = 'If the arg value is a string, this function returns this string.\nIf the arg value is a number, this function returns a string with the decimal representation of that number.\nIf the arg value is a datablock, this function returns a string with the datablock content (interpreted as textual data).\nIf the arg value is a timestamp, this function returns a string with the system-standard timestamp text representation.\nIf the arg value is an ip-address, this function returns a string with the canonical representation of that network address.\nIf the arg value is an XML Object, this function returns the XML object text body ("text node").\nIf the arg value is a null-value, this function returns a null-value.\nIn all other cases, this function returns a string with a textual representation of the arg value.';
            break;
        }
        case 12: {
            item.detail = '(CG/PL) Substring(str,from,len)';
            item.documentation = 'If the str value is a string, and the from value is a number, and the len value is a non-negative number, this function returns a string that is a substring of the str value, with the len length.\nIf from has a non-negative value, the substring starts at the from position (the first symbol of the string has the position 0).\nIf from is a negative value, then the substring ends at the -1-from position from the string end (to include the last str symbol(s), from should be -1).\nIf the from value (or -1-from value) is equal to or greater than the str value length, the result is an empty string.\nIf the from + len (or -1-from + len) value is greater than the str value length, the resulting string is shorter than len.\nIn all other cases this function returns a null-value. \nNote: this function interprets a string as a sequence of bytes, and thus it can break non-ASCII symbols which are stored as a multi-byte sequence.';
            break;
        }
        case 13: {
            item.detail = '(CG/PL) FindSubstring(str,substr)\nFindSubstring(str,substr,offset)';
            item.documentation = 'The str and substr values should be strings, while the offset should be a number. The function checks if the substr value is a substring of the str value. \nIf the offset parameter is specified and its value is greater than zero, then the search ignores the first offset bytes of the str string value, and the position of the first found substring in the str value is returned. \nIf the offset parameter is specified and its value is less than zero, then the search ignores the last -1-offset bytes of the str string value, and the position of the last found substring in the str value is returned. \nAll positions start with 0.\nIf no substring is found, this function returns the number -1. \nExample 1. The value of FindSubstring("forest","for") is 0.\nExample 2. The value of FindSubstring("A forest","for") is 2.\nExample 3. The value of FindSubstring("A forest for all","for",1) is 2.\nExample 4. The value of FindSubstring("A forest for all","for",4) is 9.\nExample 5. The value of FindSubstring("A forest for all","for",-3) is 9.\nExample 6. The value of FindSubstring("A forest for all","for",-5) is 2.';
            break;
        }
        case 14: {
            item.detail = '(CG/PL) Range(str,from,len)';
            item.documentation = 'This function works in the same way as the Substring function, but if the str value is a string, it is interpreted as a sequence of "glyphs" - single and multi-byte sequences representing ASCII and non-ASCII symbols. The from and len values specify the substring position and length in terms of symbols, rather than bytes. \nIf the str value is a datablock, the function returns a datablock containing a portion of the str value, cut using the same rules, while the from and len values specify the position position and length in bytes.';
            break;
        }
        case 15: {
            item.detail = '(CG/PL) EOL()';
            item.documentation = 'This function returns a string containing the EOL (end-of-line) symbol(s) used on the Server OS platform.';
            break;
        }
        case 16: {
            item.detail = '(CG/PL) CRLF()';
            item.documentation = 'This function returns a string with the Internet EOL ("carriage-return";"line-feed") symbols.';
            break;
        }
        case 17: {
            item.detail = '(CG/PL) ToUpperCase(str)';
            item.documentation = 'If the str value is a string, the function result is this string with all its letters converted to the upper case.';
            break;
        }
        case 18: {
            item.detail = '(CG/PL) ToLowerCase(str)';
            item.documentation = 'If the str value is a string, the function result is this string with all its letters converted to the lower case.';
            break;
        }
        case 19: {
            item.detail = '(CG/PL) IsDigit(str)';
            item.documentation = 'This function returns a true-value if the str value is a 1-symbol string and that symbol is a decimal digit (0..9), otherwise the function returns a null-value.';
            break;
        }
        case 20: {
            item.detail = '(CG/PL) IsWhiteSpaces(str)';
            item.documentation = 'This function returns a true-value if the str value is a string containing only "space", "tab", "carriage-return" or "line-feed" symbols, otherwise the function returns a null-value.';
            break;
        }
        case 21: {
            item.detail = '(CG/PL) FindRegEx(str,picture)';
            item.documentation = 'The function compares the str string with the picture string containing a regular expression.\nIf str is not a string, or picture is not a string, or the picture string cannot be interpreted as a regular expression, or the str string does not match the regular expression, the function returns a null-value.\nOtherwise, the function returns an array of strings. Its zero element contains a copy of the str string, while additional elements (if any) contain the str substrings matching the regular expression groups.\nThe picture string should specify a regular expression using the extended POSIX syntax.';
            break;
        }
        case 22: {
            item.detail = '(CG/PL) EmailDomainPart(address)';
            item.documentation = 'If the address value is a string, and the string contains the @ symbol, this function returns a string containing the address string part after its first the @ symbol.\nOtherwise, the function returns a null-value.';
            break;
        }
        case 23: {
            item.detail = '(CG/PL) EmailUserPart(address)';
            item.documentation = 'If the address value is not string, this function returns a null-value.\nIf the address value is a string not containing the @ symbol, this function returns the same string.\nOtherwise (the address value is a string containing the @ symbol), this function returns the address string part before the first @ symbol.';
            break;
        }
        case 24: {
            item.detail = '(CG/PL) IsNumber(arg)';
            item.documentation = 'This function returns a true-value if the arg value is a number, otherwise the function returns a null-value.';
            break;
        }
        case 25: {
            item.detail = '(CG/PL) Number(arg)';
            item.documentation = 'If the arg value is a number, this function returns this number.\nIf the arg value is a string, this function returns the numeric value of that string, till the first non-numeric symbol.\nFor example, the value of Number("123#") is 123.\nIn all other cases, this function returns the number 0.';
            break;
        }
        case 26: {
            item.detail = '(CG/PL) RandomNumber()';
            item.documentation = 'This function returns a random integer number in the [0..9223372036854775807] ([0..2*63-1]) range.';
            break;
        }
        case 27: {
            item.detail = '(CG/PL) IsDate(arg)';
            item.documentation = 'This function returns a true-value if the arg value is a timestamp, otherwise the function returns a null-value.';
            break;
        }
        case 28: {
            item.detail = '(CG/PL) Date(arg)';
            item.documentation = 'If the arg value is a timestamp, this function returns this timestamp.\nIf the arg value is the number 0, this function returns the "remote past" timestamp.\nIf the arg value is a negative number, this function returns the "remote future" timestamp.\nIf the arg value is a positive number N, this function returns the timestamp corresponding to the start of the Nth day, where the 1st day is 2nd of January, 1970.\nIf the arg value is a string, if should be a textual representation of some timestamp, and this function returns that timestamp.\nIn all other cases, this function returns a null-value.';
            break;
        }
        case 29: {
            item.detail = '(CG/PL) GMTTime()';
            item.documentation = 'This function returns a timestamp object with the current GMT time.';
            break;
        }
        case 30: {
            item.detail = '(CG/PL) LocalTime()';
            item.documentation = 'This function returns a timestamp object with the current local time.';
            break;
        }
        case 31: {
            item.detail = '(CG/PL) GMTToLocal(arg)';
            item.documentation = 'If the arg value is a timestamp object, this function returns a timestamp object containing the arg value converted from the GMT to the local time.\nIn all other cases, this function returns a null-value.';
            break;
        }
        case 32: {
            item.detail = '(CG/PL) LocalToGMT(arg)';
            item.documentation = 'If the arg value is a timestamp object, this function returns a timestamp object containing the arg value converted from the local time to the GMT.\nIn all other cases, this function returns a null-value.';
            break;
        }
        case 33: {
            item.detail = '(CG/PL) Year(arg)';
            item.documentation = 'If the arg value is a timestamp object, this function returns a number containing the arg value year. \nIf the the timestamp value is the "remote past" timestamp, the function returns the number 0. \nIf the the timestamp value is the "remote future" timestamp, the function returns the number 9999.\nIn all other cases, this function returns a null-value.';
            break;
        }
        case 34: {
            item.detail = '(CG/PL) Month(arg)';
            item.documentation = 'If the arg value is a timestamp object, this function returns a string containing the arg value month name (Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec).\nIf the arg value is a number in the 1..12 range, this function returns a string containing the name of month number arg (Month(1) returns Jan).\nIn all other cases, this function returns a null-value.';
            break;
        }
        case 35: {
            item.detail = '(CG/PL) MonthNum(arg)';
            item.documentation = 'If the arg value is a timestamp object, this function returns the arg value month number (1 for January).\nIn all other cases, this function returns a null-value.';
            break;
        }
        case 36: {
            item.detail = '(CG/PL) MonthDay(arg)';
            item.documentation = 'If the arg value is a timestamp object, this function returns a number containing the day of month for the arg value date (1 is returned for the first day of month).\nIn all other cases, this function returns a null-value.';
            break;
        }
        case 37: {
            item.detail = '(CG/PL) WeekDay(arg)';
            item.documentation = 'If the arg value is a timestamp object, this function returns a string containing the name of week day of the arg value date (Mon, Tue, Wed, Thu, Fri, Sat, Sun).\nIn all other cases, this function returns a null-value.';
            break;
        }
        case 38: {
            item.detail = '(CG/PL) YearDay(arg)';
            item.documentation = 'If the arg value is a timestamp object, this function returns a number containing the day of year for the arg value date (the number 1 is returned for the 1st of January).\nIn all other cases, this function returns a null-value.';
            break;
        }
        case 39: {
            item.detail = '(CG/PL) TimeOfDay(arg)';
            item.documentation = 'If the arg value is a timestamp object, this function returns the number of seconds between the date arg value and the start of its day.\nIn all other cases, this function returns a null-value.';
            break;
        }
        case 40: {
            item.detail = '(CG/PL) DateNumber(arg)';
            item.documentation = 'If the arg value is a timestamp object, this function returns the number of full days between the arg value date and 01-Jan-1970.\nIn all other cases, this function returns a null-value.';
            break;
        }
        case 41: {
            item.detail = '(CG/PL) DateByMonthDay(year,monthNum,monthDay)';
            item.documentation = 'The year, monthNum, monthDay values should be positive numbers. If any of these values is incorrect, this function returns a null-value. Otherwise, the function returns a timestamp object presenting midnight of the specified date.\nThe following expression timestamp value is midnight, 05-Nov-2008: DateByMonthDay(2008,11,5)';
            break;
        }
        case 42: {
            item.detail = '(CG/PL) DateByYearDay(year,yearDay)';
            item.documentation = 'The year, yearDay values should be positive numbers. If any of these values is incorrect, this function returns a null-value. Otherwise, the function returns a timestamp object presenting midnight of the specified date.\nThe following expression timestamp value is midnight, 01-Feb-2006: DateByYearDay(2006,32)';
            break;
        }
        case 43: {
            item.detail = '(CG/PL) IsIPAddress(arg)';
            item.documentation = 'This function returns a true-value if the arg value is an ip-address, otherwise the function returns a null-value.';
            break;
        }
        case 44: {
            item.detail = '(CG/PL) IPAddress(arg)';
            item.documentation = 'If the arg value is an ip-address, this function returns this ip-address.\nIf the arg value is a string with a correct presentation of an IP address (with an optional port number), the function returns that ip-address.\nIn all other cases, this function returns a null-value.';
            break;
        }
        case 45: {
            item.detail = '(CG/PL) IsData(arg)';
            item.documentation = 'This function returns a true-value if the arg value is a datablock, otherwise the function returns a null-value.';
            break;
        }
        case 46: {
            item.detail = '(CG/PL) RandomData(length)';
            item.documentation = 'The length value should be a positive numbers not larger than 4096.\nThis function returns a datablock of the specified length, filled with random data.';
            break;
        }
        case 47: {
            item.detail = '(CG/PL) EmptyData()';
            item.documentation = 'This function returns an empty datablock.';
            break;
        }
        case 48: {
            item.detail = '(CG/PL) IsArray(arg)';
            item.documentation = 'This function returns a true-value if the arg value is an array, otherwise the function returns a null-value.';
            break;
        }
        case 49: {
            item.detail = '(CG/PL) NewArray()';
            item.documentation = 'This function returns a newly created empty array.';
            break;
        }
        case 50: {
            item.detail = '(CG/PL) Invert(arg)';
            item.documentation = 'The arg value should be an array, otherwise this function call results in a program exception.\nThis function returns an array containing the same elements as the arg value, but in the reversed order.';
            break;
        }
        case 51: {
            item.detail = '(CG/PL) Find(source,object)';
            item.documentation = 'If the source value is an array, this function returns a number - the index in the array for the first element equal to the object value. If the source array does not contain such an object, a negative numeric value is returned.\nIf the source value is a Calendar handle, calendar items are returned (see below).\nIf the source value is anything else, a negative numeric value is returned.';
            break;
        }
        case 52: {
            item.detail = '(CG/PL) AddElement(target,element)';
            item.documentation = 'If the target value is an array, this procedure adds element value as the new last element of that array.\nIf the myArray value is (1,4,9,16,25), the AddElement(myArray,"test") call changes the myArray value to (1,4,9,16,25,"test").\nIf the target value is an XML Object, this procedure adds element value as its new sub-element (the element value should be a string or an XML Object).\nIn all other cases this procedure call results in a program exception.';
            break;
        }
        case 53: {
            item.detail = '(CG/PL) RemoveElement(target,what)';
            item.documentation = 'This procedure removes an element from an array.\nIf target value is an array, the what value should be a number or a string containing a decimal number, specifying the array element to remove.\nIf the myArray value is (1,4,9,16,25), the RemoveElement(myArray,2) call changes the myArray value to (1,4,16,25).\nIn all other cases this procedure call results in a program exception.';
            break;
        }
        case 54: {
            item.detail = '(CG/PL) InsertElement(target,index,element)';
            item.documentation = 'This procedure inserts an element into an array.\nThe target value should be an array, otherwise this procedure call results in a program exception.\nThe index value should be a number or a string containing a decimal number, specifying where to insert the element value. All existing array elements with index number of index and bigger increase their index number by one.\nIf the myArray value is (1,4,9,16,25), the InsertElement(myArray,2,"Jack") call changes the myArray value to (1,4,"Jack",9,16,25).';
            break;
        }
        case 55: {
            item.detail = '(CG/PL) SortStrings(arg)';
            item.documentation = 'This procedure sorts array elements.\nThe arg value should be an array, and all array elements must be strings, otherwise this procedure call results in a program exception.\nThe array elements are compared as case-insensitive UTF-8 strings.';
            break;
        }
        case 56: {
            item.detail = '(CG/PL) IsDictionary(arg)';
            item.documentation = 'This function returns a true-value if the arg value is a dictionary, otherwise the function returns a null-value.';
            break;
        }
        case 57: {
            item.detail = '(CG/PL) NewDictionary()';
            item.documentation = 'This function returns a newly created empty dictionary.';
            break;
        }
        case 58: {
            item.detail = '(CG/PL) SetCaseSensitive(target,flag)';
            item.documentation = 'This procedure specifies if dictionary keys should be processes as case-sensitive. \nThe target value should be a dictionary, otherwise this procedure call results in a program exception. \nIf flag value is a null-value, the target dictionary becomes case-insensitive, otherwise it becomes case-sensitive. \nNew dictionaries are created as case-sensitive.';
            break;
        }
        case 59: {
            item.detail = '(CG/PL) IsXML(arg)';
            item.documentation = 'This function returns a true-value if the arg value is an XML object, otherwise the function returns a null-value.';
            break;
        }
        case 60: {
            item.detail = '(CG/PL) NewXML(type)\nNewXML(type,prefix)\nNewXML(type,prefix,namespace)';
            item.documentation = 'This function returns a newly created XML Object of type type. The type value should be a string containing a valid XML tag.\nThe prefix value (if specified) can be a null-value or a string containing a valid XML prefix. This prefix is used to qualify the XML object name, if not specified or if its value is a null-value, then an empty string value is used. \nIf the namespace value is specified and its value is not a null-value, it should be a string containing the namespace to be associated with the prefix value.';
            break;
        }
        case 61: {
            item.detail = '(CG/PL) SetNamespace(data,namespace)\nSetNamespace(data,namespace,prefix)';
            item.documentation = 'This procedure associates an XML prefix with some namespace. \nThe data value should be an XML Object, otherwise this procedure call results in a program exception. \nIf the prefix is not specified, or its value is a null-value, then an empty string value is used. Otherwise, its value should be a string containing a valid XML prefix. \nIf the namespace value is a null-value, the namespaces associated with the prefix value is removed. Otherwise the namespace value should be a string, containing the namespace to be associated with the prefix value.';
            break;
        }
        case 62: {
            item.detail = '(CG/PL) GetNamespace(data)\nGetNamespace(data,prefix)';
            item.documentation = 'This function returns a string with the namespace associated with the specified XML prefix, or a null-value if there is no associated namespace. \nThe data value should be an XML Object, otherwise this function call results in a program exception. \nIf the prefix is not specified, or its value is a null-value, then an empty string value is used. Otherwise, its value should be a string containing a valid XML prefix.';
            break;
        }
        case 63: {
            item.detail = '(CG/PL) GetPrefix(data,namespace)';
            item.documentation = 'This function returns a string with the prefix assigned to the specified namespace, or a null-value if the namespace is not included into the XML object. \nThe data value should be an XML Object, otherwise this function call results in a program exception. \nThe prefix value should be a string containing a valid XML prefix.';
            break;
        }
        case 64: {
            item.detail = '(CG/PL) SetAttribute(data,value,name)\nSetAttribute(data,value,name,prefix)';
            item.documentation = 'This procedure sets an XML Object attribute for the specified name and prefix. \nThe data value should be an XML Object, otherwise this procedure call results in a program exception. \nThe name value should be a string containing a valid XML attribute name. \nIf the prefix parameter is specified, its value should be a null-value or a string containing a valid XML prefix. \nIf the value value is a null-value, the attribute with the specified name and prefix is removed. Otherwise the value value should be a string containing the new attribute value.';
            break;
        }
        case 65: {
            item.detail = '(CG/PL) GetAttribute(data,name)\nGetAttribute(data,name,prefix)';
            item.documentation = 'The data value should be an XML Object, otherwise this function call results in a program exception. \nIf the prefix parameter is specified, its value value should be a null-value or a string containing a valid XML prefix. \nIf the name value is a string, it should contain a valid XML attribute name. In this case this function returns a string value of the attribute with the specified name and prefix, or a null-value if there is no such attribute. \nIf the name value is a number, it should specify the attribute index (starting from 0). If an attribute with this index does not exist, this function returns a null-value. Otherwise, this function returns an array. The first array element is the attribute name, the second array element is the attribute prefix. \nIf the name value is not a string and it is not a number, this function call results in a program exception.';
            break;
        }
        case 66: {
            item.detail = '(CG/PL) XMLBody(data,type)\nXMLBody(data,type,namespace)\nXMLBody(data,type,namespace,index)';
            item.documentation = 'This function returns an XML sub-element with the specified type, namespace, and position, or a null-value if there is no such sub-element. \nThe data value should be an XML Object, otherwise this function call results in a program exception. \nThe type value should be a null-value or a string containing a valid XML tag name. If the type value is a null-value, the function retrieves sub-elements of any type. \nIf the namespace parameter is specified, its value should be a null-value or a string containing a namespace. If the namespace is not specified, or its value is a null-value, the function looks for sub-elements ignoring their namespaces. \nIf the index parameter is specified, its value should be a non-negative number. To retrieve the first sub-element with the specified type and namespace, the index value (if specified) should be 0.';
            break;
        }
        case 67: {
            item.detail = '(CG/PL) XMLType(data)';
            item.documentation = 'This function returns a string with the XML Object type. \nThe data value should be an XML Object, otherwise this function call results in a program exception.';
            break;
        }
        case 68: {
            item.detail = '(CG/PL) XMLPrefix(data)';
            item.documentation = 'This function returns a string with the XML Object type prefix. \nThe data value should be an XML Object, otherwise this function call results in a program exception.';
            break;
        }
        case 69: {
            item.detail = '(CG/PL) ObjectToString(arg)';
            item.documentation = 'This function returns a string with a textual representation of the arg value.\nIf the arg value is a null-value, the function returns the "#null#" string.';
            break;
        }
        case 70: {
            item.detail = '(CG/PL) ObjectToXML(arg)';
            item.documentation = 'This function returns an XML representation of the arg value, as specified in XML Objects section.';
            break;
        }
        case 71: {
            item.detail = '(CG/PL) ToObject(arg)';
            item.documentation = 'If the arg value is a string or a datablock, this function returns an object textually represented with the arg value. \nIf the arg value is an XML object, this function returns an object this XML represents (as specified in XML Objects section). \nOtherwise this function call results in a program exception.\nIf conversion fails or if the arg value is the "#null#" string, the function returns a null-value.';
            break;
        }
        case 72: {
            item.detail = '(CG/PL) Base64Encode(arg)';
            item.documentation = 'The arg value should be a string or a datablock, otherwise this function call results in a program exception.\nThis function returns a string containing the base64-encoded arg data.';
            break;
        }
        case 73: {
            item.detail = '(CG/PL) Base64Decode(arg)';
            item.documentation = 'The arg value should be a string, otherwise this function call results in a program exception.\nThis function returns a datablock containing the base64-decoded arg data.';
            break;
        }
        case 74: {
            item.detail = '(CG/PL) AppToXML(data,format)';
            item.documentation = 'This function converts application data into its XML representation. \nThe data value should be a string or a datablock containing the application data text. \nThe format value should be a string specifying the application data format. The following formats are supported: vCard - vCard format, the function returns either a vCard XML object, or an array of vCard XML objects. vCardGroup - vCardGroup format, the function returns a vCardGroup XML object. iCalendar - iCalendar format, the function returns an iCalendar XML object. sdp - SDP format, the function returns an SDP XML object. \nIf the function fails to parse the application data, or the specified format is not supported, the function returns an error code string.';
            break;
        }
        case 75: {
            item.detail = '(CG/PL) XMLToApp(data)';
            item.documentation = 'This function converts an XML representation into application data (see above). \nThe data value should be an XML object. \nThe function returns the application data string. \nIf the XML object is not a representation of some supported application data format, the resulting string is a generic textual representation of the data value XML object. \nIf the function fails to convert the XML representation into application data, the resulting string contains the error code.';
            break;
        }
        case 76: {
            item.detail = '(CG/PL) ObjectToJSON(arg)';
            item.documentation = 'This function returns a string with a JSON (JavaScript Object Notation) representation of the arg value.\nNull-values are represented as null tokens. \nTimestamp objects are represented as RFC822-formatted date strings.';
            break;
        }
        case 77: {
            item.detail = '(CG/PL) JSONToObject(arg)';
            item.documentation = 'If the arg value is a string or a datablock, this function returns an object textually represented with the arg value, using the JSON format. \nOtherwise this function call results in a program exception.\nIf conversion fails or if the arg value is the null string, the function returns a null-value.';
            break;
        }
        case 78: {
            item.detail = '(CG/PL) Convert(data,format)';
            item.documentation = 'This function converts the data value into the format specified with the format value, which should be a string. \nThe following format values are supported (case-insensitive, unless explicitly specified): "base64" If the data value is a string, the function returns a datablock with its base64-decoded data. \nIf the data value is a datablock, the function returns a string with its base64-encoded data. "hex" If the data value is a string, it should contain hexadecimal symbols, and the function returns a datablock with its decoded data. \nIf the data value is a datablock, the function returns a string with its hexadecimal encoding. The "HEX" format produces upper-case encodings, the "hex" format produces lower-case encodings. "ucs-2[+][le|be]" If the data value is a string, the function returns a datablock with its ucs-2 encoded data. \nIf the data value is a datablock, the function returns a string with its ucs-2 decoded data. \nThe le or be suffix specifies the ucs-2 encoding byte order (little-endian or big-endian, respectively). The big-endian byte order is used by default. \nIf the datablock to be decoded contains a BOM (byte order mark), the byte order suffix is ignored. \nThe + symbol causes the BOM (byte order mark) to be placed into the encoded data. This symbol is ignored when decoding. "charsetName" (any character set name known to the CommuniGate Pro Server) If the data value is a string, the function returns a datablock with its data encoded using the specified character set. \nIf the data value is a datablock, the function returns a string with its data decoded from the specified character set. "utfcode" If the data value is a string, the function returns a number - the Unicode code of the first string symbol. \nIf the data value is a number, it is interpreted as a Unicode code, and the function returns a string consisting of this symbol. "words" If the data value is a string, the function splits it into words - non-empty substrings separated with sequences of "white space" and "end of line" symbols, and returns an array containing all "word" strings. "asn.1" If the data value is an array, it should represent some ASN.1 data structure. The function returns a datablock with ASN.1 BER encoding of this structure. \nIf encoding fails, the function returns an error code string. \nIf the data value is a datablock, the function returns an array representing this ASN.1 data structure. \nIf decoding fails, the function returns an error code string. "dns-a" If the data value is a string, the function peforms a DNS A-record search for this domain name. \nThe function returns either an array of IP Addresses from the found records, or an error code string. "dns-aaaa" Same as "dns-a", but for the DNS AAAA-record. "dns-ptr" If the data value is a string, the function peforms a DNS PTR-record search for this domain name. \nIf the data value is an IP Address, the function peforms a DNS "IN-Addr" PTR-record search for that address. \nThe function returns either an array with one string element - the found domain name, or an error code string. "dns-txt" If the data value is a string, the function peforms a DNS TXT-record search for this domain name. \nThe function returns either an array containing the found record strings, or an error code string. "gennonce" The function returns a datablock with a "nonce" data. The data value should be a number, it specifies the "nonce" size in bytes. If this value is outside the supported nonce size range, the function returns a null-value. "checknonce" If the data value is a datablock, the function returns a true-value if this datablock is a valid "nonce", otherwise the function returns a null-value.';
            break;
        }
        case 79: {
            item.detail = '(CG/PL) SystemInfo(what)';
            item.documentation = 'This function retrieves platform-specific data specified with the what value, which should be a string. \nThe following what values are supported (case-insensitive, unless explicitly specified): "serverVersion" The function returns a string with this CommuniGate Pro Server version. "serverOS" The function returns a string with the name of the Operating System controlling the computer this CommuniGate Pro Server is running on. "serverCPU" The function returns a string with the type of processor(s) this CommuniGate Pro Server is running on. "mainDomainName" \nThe function returns a string with the CommuniGate Pro Server Main Domain Name.\n "licenseDomainName" \nThe function returns a string with the Cluster Domain Name for a Cluster system, the Main Domain Name or a non-clustered system. \n "startTime" \nThe function returns a timestamp value specifying the time when this CommuniGate Pro Server instance started.\n "serverInstance" \nThe function returns a string which is unique for each running instance of the CommuniGate Pro Server.\n "clusterInstance" \nThe function returns a string which is unique for each running instance of the CommuniGate Pro Cluster, and it has the same value for all cluster members.\n';
            break;
        }
        case 80: {
            item.detail = '(CG/PL) CryDigest(algName,data), CryDigest(algName,data,salt)';
            item.documentation = 'This function computes the cryptographic digest of the data datablock. \nThe algName value should be a string specifying the digest algorithm name (MD5, SHA1, etc). \nIf the third parameter salt is specified, the digest is calculated using the HMAC algorithm with this third parameter used as the key and algName used for both HMAC stages. \nIf the algorithm with the specified name is unknown, the function returns a null-value, otherwise the function returns a datablock with the calculated digest.';
            break;
        }
        case 81: {
            item.detail = '(CG/PL) CryEncrypt(algName,key,data)';
            item.documentation = 'This function encrypts the data datablock using the key datablock as the encryption key. \nThe algName value should be a string specifying the cipher algorithm name (RC4, DES3, AES, etc). \nIf the algorithm with the specified name is unknown, the function returns a null-value, otherwise the function returns a datablock with the encrypted data.';
            break;
        }
        case 82: {
            item.detail = '(CG/PL) CryDecrypt(algName,key,data)';
            item.documentation = 'This function decrypts the data datablock using the key datablock as the decryption key. \nThe algName value should be a string specifying the cipher algorithm name. \nIf the algorithm with the specified name is unknown, the function returns a null-value, otherwise the function returns a datablock with the decrypted data.';
            break;
        }
        case 83: {
            item.detail = '(CG/PL) Vars()';
            item.documentation = 'This function returns a dictionary unique for this Task (a program invocation). This dictionary can be used to store "task variables" visible in all procedures and functions executed in this Task.\nWhen a Task is started with parameters (for example, when a Real-Time Application is started to process a Signal directed with the Router), the parameter array is placed into the startParameter element of the Vars() dictionary. \nThe following example retrieves the first two Task parameters: firstParam = Vars().startParameter[0];\nsecondParam = Vars().startParameter[1];';
            break;
        }
        case 84: {
            item.detail = '(CG/PL) SIPURIToEmail(uri)';
            item.documentation = 'This function converts the uri value from a SIP URI into an E-mail string.\nIf the uri value is not a string, or if it cannot be parsed as a SIP URI, the function returns a null-value.';
            break;
        }
        case 85: {
            item.detail = '(CG/PL) EmailToSIPURI(email)';
            item.documentation = 'This function converts the email value from an E-mail address into a SIP URI string.\nIf the email value is not a string, or if it cannot be parsed as an E-mail, the function returns a null-value.';
            break;
        }
        case 86: {
            item.detail = '(CG/PL) PhoneNumberToSIPURI(phoneNumber)';
            item.documentation = 'This function converts the phoneNumber value into a SIP URI string.\nIf the email value is not a string, or if it cannot be parsed as a telephone number, the function returns a null-value.\nThe function removes all formatting symbols from the phoneNumber value, leaving only the digits and the leading plus (+) symbol (if it exists).\nThe function adds the current Domain name to the converted number.';
            break;
        }
        case 87: {
            item.detail = '(CG/PL) RouteAddress(email,type)';
            item.documentation = 'This function uses the Router to process the email address.\nThe type value specifies the address type: it should be the mail, signal, or access string.\nIf address routing fails, the function returns an error code string. Otherwise, the function result is a dictionary with the following elements: module - the name of the CommuniGate Pro module that will process this address. host- a string with the name of the host (a local Account, a remote domain, etc.) the address is routed to. object - a string with the name of the host object the address is routed to. canRelay - this optional element exists and contains a true-value if information can be relayed to this address.';
            break;
        }
        case 88: {
            item.detail = '(CG/PL) RouteENUM(service,phoneNumber,domain)';
            item.documentation = 'This function uses the Domain Name Resolver to convert the phoneNumber telephone number (a string with any sequence of digits with an optional leading + symbol) into a URL.\nThe service value should be a string. It specifies the ENUM "service" (such as "E2U+SIP" or "E2U+MAIL").\nThe domain value should be a string. It specifies the ENUM domain name (such as "e164.arpa").\nIf the telephone number has been converted successfully, this function returns an array. Its first element contains a string - the resulting URL.\nOtherwise, this function returns an error code string.';
            break;
        }
        case 89: {
            item.detail = '(CG/PL) MyDomain()';
            item.documentation = 'This function returns a string with the current Domain name, if there is one. If there is no Account or Domain associated with the current Task, this function returns a null-value.';
            break;
        }
        case 90: {
            item.detail = '(CG/PL) MyEmail()';
            item.documentation = 'This function returns a string with the current Account E-mail, if there is one. If there is no Account associated with the current Task, this function returns a null-value.';
            break;
        }
        case 91: {
            item.detail = '(CG/PL) GetAccountPreferences(keyName)';
            item.documentation = 'This function returns Preference data for the current Account.\nIf the keyName is a non-empty string, the Account Preference object for that key is returned. Otherwise a dictionary with all effective Account Preferences is returned.\nIf the keyName string starts with a ~username/ prefix, the prefix is removed. The username string specifies the name of the Account to use. If this Account is not the same as the current Account, the operation succeeds only if the current Account has a Domain Administrator right for the specified Account Domain.';
            break;
        }
        case 92: {
            item.detail = '(CG/PL) SetAccountPreferences(keyValue,keyName)';
            item.documentation = 'This function updates Preference data for the current Account.\nIf the keyName is a non-empty string, the keyValue value specifies the new object for that key. If the keyValue is a null-value, the object is removed from the Account Preference data, enabling the default value for the specified key.\nIf the keyName string starts with a ~username/ prefix, the prefix is removed. The username string specifies the name of the Account to update. If this Account is not the same as the current Account, the operation succeeds only if the current Account has a Domain Administrator right for the specified Account Domain.\nIf the keyName is a ~username/ string, or an empty string, or if it is not a string, the keyValue value must be a dictionary. It is used to update the Account Preference Data.\nThis function returns a null-value if Preference data is successfully updated, otherwise it returns a string with an error code.';
            break;
        }
        case 93: {
            item.detail = '(CG/PL) Impersonate(email)';
            item.documentation = 'This function Routes the email address and sets the result as the current Account.\nIf the routed address is not local, the current Account is cleared.\nIf the routed address is local and it is not the same as the current Account, the current Account must have the CanImpersonate access right for the routed address Domain.\nWhen the current Account is changed, the preferences, the selected language, and the selected time zone are changed, too.\nThis function returns a null-value if the operation has succeeded, otherwise it returns a string with an error code.';
            break;
        }
        case 94: {
            item.detail = '(CG/PL) ReadGroupMembers(groupName)';
            item.documentation = 'This function reads a Group.\nThe groupName value should be a string. It specifies the name of the Group to read. If this name does not contain a Domain name, the current Domain is used.\nThis function returns an array of strings containing Group member E-mail addresses. This function returns a null-value if there is no Group with the specified name.\nThe current Account should have the Domain Administrator right for the Group Domain.';
            break;
        }
        case 95: {
            item.detail = '(CG/PL) ReadTelnums()\nReadTelnums(accountName)';
            item.documentation = 'This function reads Phone Numbers assigned to the accountName Account or to the current Account, if the accountName parameter is not specified or if its value is a null-value.\nThis function returns an array of strings. This function returns a null-value if there is no Account with the specified name.\nTo retrieve the Phone Numbers assigned to a different Account, the current Account should have the Domain Administrator right for the accountName Account Domain.';
            break;
        }
        case 96: {
            item.detail = '(CG/PL) UpdateAccountMailRule(ruleData)\nUpdateAccountMailRule(ruleData,accountName)';
            item.documentation = 'This function modify Account Queue Rules.\nThe ruleData parameter is a string or an array. It has the same meaning as the newRule parameter of the UpdateAccountSignalRule CLI commands.\nThese functions update the Rules of the the accountName Account, or the current Account if the accountName parameter is not specified or its value is a null-value.\nTo update Queue Rules of a different Account, the current Account should have the RulesAllowed Domain Administrator right for the accountName Account Domain. This function returns a null-value if the operation has succeeded, otherwise it returns a string with an error code.';
            break;
        }
        case 97: {
            item.detail = '(CG/PL) UpdateAccountSignalRule(ruleData)\UpdateAccountSignalRule(ruleData,accountName)';
            item.documentation = 'This function modify Account Signal Rules.\nThe ruleData parameter is a string or an array. It has the same meaning as the newRule parameter of the UpdateAccountSignalRule CLI commands.\nThese functions update the Rules of the the accountName Account, or the current Account if the accountName parameter is not specified or its value is a null-value.\nTo update Signal Rules of a different Account, the current Account should have the SignalRulesAllowed Domain Administrator right for the accountName Account Domain.\nThis function returns a null-value if the operation has succeeded, otherwise it returns a string with an error code.';
            break;
        }
        case 98: {
            item.detail = '(CG/PL) ListMailboxes(filter)';
            item.documentation = 'This function lists all Mailboxes in the current Account. \nThe filter value should be a string - it specifies the search pattern. If the value is a null-value, the search pattern * (all Account Mailboxes) is used. \nTo search Mailboxes in a different Account, the search pattern should be specified as a "~accountName/pattern" string. \nIf the operation is successful, this function returns a dictionary. Each dictionary key is a string with the found Mailbox name. \nThe dictionary element value is: a dictionary with the Mailbox attributes - if the found Mailbox is an "item container" only. an empty array - if the found Mailbox is a "mailbox folder" only. an array with one dictionary element- if the found Mailbox is both a "mailbox folder" and an "item container". \nIf the Mailbox Access rights allow the current Account to see that Mailbox, but do not allow the current Account to open it, the Mailbox Attribute dictionary is replaced with a string containing the Mailbox Access Rights for the current Account.\nIf this function fails, it returns a string with an error code.';
            break;
        }
        case 99: {
            item.detail = '(CG/PL) CreateMailbox(mailboxName,class)';
            item.documentation = 'This function creates the mailboxName Mailbox.\nIf the class is not a null-value, it specified the Mailbox Class for the newly created Mailbox.\nThis function returns a null-value if the Mailbox is successfully created, otherwise it returns a string with an error code.';
            break;
        }
        case 100: {
            item.detail = '(CG/PL) RenameMailbox(oldMailboxName,newMailboxName,renameSub)';
            item.documentation = 'This function renames the oldMailboxName Mailbox into newMailboxName. Both parameters must have string values. \nIf the renameSub value is not a null-value, all oldMailboxName sub-Mailboxes are renamed, too.\nThis function returns a null-value if the Mailbox is successfully renamed, otherwise it returns a string with an error code.';
            break;
        }
        case 101: {
            item.detail = '(CG/PL) DeleteMailbox(mailboxName,deleteSub)';
            item.documentation = 'This function deletes the mailboxName Mailbox. \nIf the deleteSub value is not a null-value, all mailboxName sub-Mailboxes are deleted, too.\nThis function returns a null-value if the Mailbox is successfully deleted, otherwise it returns a string with an error code.';
            break;
        }
        case 102: {
            item.detail = '(CG/PL) GetMailboxACLs(mailboxName)';
            item.documentation = 'This function reads the Access Control List for the mailboxName Mailbox.\nIf the function successfully retrieves the ACL data, it returns a dictionary containing ACL identifiers as keys, and access rights as value strings. \nOtherwise the function returns a string with an error code.';
            break;
        }
        case 103: {
            item.detail = '(CG/PL) SetMailboxACLs(mailboxName,newACLs)';
            item.documentation = 'This function updates the Access Control List for the mailboxName Mailbox.\nThe newACL value should be a dictionary, containing ACL identifiers as keys, and access rights as value strings. \nTo remove an identifier from the ACL, specify an empty array as its value.\nThis function returns a null-value if the Mailbox ACL is successfully modified, otherwise it returns a string with an error code.';
            break;
        }
        case 104: {
            item.detail = '(CG/PL) GetMailboxAliases(accountName)';
            item.documentation = 'This function reads Mailbox Aliases created in the accountName Account or to the current Account, if the accountName value is a null-value.\nIf the function successfully retrieves the Mailbox Aliases data, it returns a dictionary. Each dictionary key is the Mailbox Alias name, and its value is a string with the Mailbox name this Mailbox Alias points to. \nOtherwise the function returns a string with an error code.';
            break;
        }
        case 105: {
            item.detail = '(CG/PL) SetMailboxAliases(newAliases,accountName)';
            item.documentation = 'This function sets the Mailbox Aliases for the accountName Account or for the current Account, if the accountName value is a null-value. The old Mailbox Aliases are removed.\nThe newAliases value should be a dictionary. Each dictionary key is the Mailbox Alias name, and its value is a string with the Mailbox name this Mailbox Alias points to.\nThis function returns a null-value if the Mailbox Aliases are successfully modified, otherwise it returns a string with an error code.';
            break;
        }
        case 106: {
            item.detail = '(CG/PL) GetMailboxSubscription(accountName)';
            item.documentation = 'This function reads Mailbox Subscription created in the accountName Account or to the current Account, if the accountName value is a null-value.\nIf the function successfully retrieves the Mailbox Subscription data, it returns an array. Each array element is a string containing a Mailbox name. \nOtherwise the function returns a string with an error code.';
            break;
        }
        case 107: {
            item.detail = '(CG/PL) SetMailboxSubscription(newSubscription,accountName)';
            item.documentation = 'This function sets the Mailbox Subscription for the accountName Account or to the current Account, if the accountName value is a null-value. The old Mailbox Subscription elements are removed.\nThe newSubscription value should be an array. Each array element is a string containing a Mailbox name.\nThis function returns a null-value if the Mailbox Subscription is successfully modified, otherwise it returns a string with an error code.';
            break;
        }
        case 108: {
            item.detail = '(CG/PL) OpenMailbox(mailboxName)';
            item.documentation = 'This function opens a Mailbox. The mailboxName value should be a string. It specifies the Mailbox name.\nIf the name does not start with the ~ symbol, the Mailbox is opened in the current Account, if any.\nThe current Account (if any) must have the Read/Select access right for the specified Mailbox.\nThe function returns a Mailbox handle if the Mailbox has been opened successfully, otherwise it returns an error code string.';
            break;
        }
        case 109: {
            item.detail = '(CG/PL) OpenMailboxView(params)';
            item.documentation = 'This function opens a Mailbox and creates a Mailbox handle.\nThe params value should be a dictionary containing a mailbox and sortField string elements, and optional mailboxClass, sortOrder, filter, filterField string elements, and UIDValidity, UIDMin numeric elements. \nSee the XIMSS section for more details on these parameter values.\nThe function returns a Mailbox handle if the Mailbox has been opened successfully, otherwise it returns an error code string.';
            break;
        }
        case 110: {
            item.detail = '(CG/PL) MailboxUIDs(boxRef,flags)';
            item.documentation = 'This function returns an array of numbers - Mailbox message UIDs.\nThe boxRef value should be a Mailbox handle.\nIf the flags value is a string, it should contain a comma-separated list of message flag Negative Names. Only UIDs of messages that have flags specified with the flag Names and do not have flags specified with the Negative Names are included into the resulting array. \nThe following example retrieves UIDs of all messages that have the Seen flag and do not have the Deleted flag: myMailbox = OpenMailbox("INBOX");\nseen = MailboxUIDs(myMailbox,"Seen,Undeleted");';
            break;
        }
        case 111: {
            item.detail = '(CG/PL) SubscribeEvents(object,refData)';
            item.documentation = 'This function enables or disables object object event generation.\nIf the refData value is a null-value, the object stops to generate events.\nOtherwise, the refData value should be a "basic" object. When the object generates events and send them to this Task, the event parameter element contains the refData value.\nIf the object value is a Mailbox handle, it should be created with the OpenMailboxView function. A Mailbox notification Event is sent to this Task when the Mailbox messages are removed, added, or modified. The "mailbox view" is not actually modified (i.e. the MailboxUIDs function returns the same set of message UIDs) until the Sync operation is applied to that Mailbox handle.';
            break;
        }
        case 112: {
            item.detail = '(CG/PL) IsMailboxNotifyEvent(data)';
            item.documentation = 'This function returns a true-value if the data value is a Mailbox notification Event, otherwise it returns a null-value.';
            break;
        }
        case 113: {
            item.detail = '(CG/PL) Sync(boxRef)';
            item.documentation = 'This function checks for Mailbox modifications.\nThe boxRef value should be a Mailbox Handle.\nThis function takes the first pending Mailbox modification and "commits" it by modifying the message UIDs (adding added messages, removing removed messages). It returns a dictionary with the following elements: mode - a "removed", "added", "updated", or "attrsUpdated" string specifying this Mailbox modification type. UID - a number - the UID of the removed, added, or modified. messageindex - for an updated message - its position in the message UIDs array.\nfor a removed message - its position in the message UIDs array before it was removed from that array.\nfor an added message - its position in the message UIDs array after it was added to that array. \nIf there is no pending modification in the Mailbox, this function returns a null-value.';
            break;
        }
        case 114: {
            item.detail = '(CG/PL) MailboxInternalTimeByUID(boxRef,uid)';
            item.documentation = 'This function returns a timestamp object containing the message Internal Date.\nThe boxRef value should be a Mailbox handle, the uid value should be a number - the message UID.\nIf a message with the specified UID does not exist in the Mailbox, the function returns a null-value.';
            break;
        }
        case 115: {
            item.detail = '(CG/PL) MailboxFlagsByUID(boxRef,uid)';
            item.documentation = 'This function returns a string containing a comma-separated list of Mailbox message flags Names.\nThe boxRef value should be a Mailbox handle, the uid value should be a number - the message UID.\nIf a message with the specified UID does not exist in the Mailbox, the function returns a null-value.';
            break;
        }
        case 116: {
            item.detail = '(CG/PL) MailboxOrigUIDByUID(boxRef,uid)';
            item.documentation = 'This function returns a number containing the message "original" (permanent) UID.\nThe boxRef value should be a Mailbox handle, the uid value should be a number - the message UID.\nIf a message with the specified UID does not exist in the Mailbox, the function returns a null-value.';
            break;
        }
        case 117: {
            item.detail = '(CG/PL) MailboxUIDByOrigUID(boxRef,origUID)';
            item.documentation = 'This function returns a number containing the real UID of the message with the specified "original" (permanent) UID.\nThe boxRef value should be a Mailbox handle, the origUID value should be a number - the message original UID.\nIf a message with the specified original UID does not exist in the Mailbox, the function returns a null-value.';
            break;
        }
        case 118: {
            item.detail = '(CG/PL) MailboxSetFlags(boxRef,idData,params)';
            item.documentation = 'This function modifies Mailbox Message flags.\nThe boxRef value should be a Mailbox handle, and the idData value is a "message set" (see above).\nIf the params value is a string, it should be "flag values": a comma-separated list of message flag Negative Names.\nIf the params value is a dictionary, it should include the following elements: flags - the "flag values" string useIndex - if this optional element is present, the "message set" specified with the idData value is interpreted as a set of message index values in the boxRef "mailbox view", if this element is absent, it is interpreted as the UID value set. \nThis element can be present only if the boxRef handle was open using the OpenMailboxView function. Otherwise this function call results in a program exception. \nThe function sets the flags specified with their Names and resets the flags specified with their Negative Names.\nThe function returns a null-value if the current Account (if any) has sufficient Mailbox Access Rights to modify the flags, and flags have been successfully modified, otherwise the function returns an error code string.';
            break;
        }
        case 119: {
            item.detail = '(CG/PL) MailboxExpunge(boxRef)';
            item.documentation = 'This function removes all Mailbox messages marked as "purgable" or "deleted".\nThe boxRef value should be a Mailbox handle.\nThis function returns a null-value if the operation has succeeded, otherwise it returns a string with an error code.';
            break;
        }
        case 120: {
            item.detail = '(CG/PL) MailboxAudioByUID(boxRef,uid)';
            item.documentation = 'This function returns a datablock containing an audio section of the message.\nThe boxRef value should be a Mailbox handle, the uid value should be a number - the message UID.\nIf a message with the specified UID does not exist in the Mailbox, or the message does not contain an audio part, the function returns a null-value.';
            break;
        }
        case 121: {
            item.detail = '(CG/PL) MailboxRedirectByUID(boxRef,uid,addresses)';
            item.documentation = 'This function redirect the specified message to the specified E-mail addresses.\nThe boxRef value should be a Mailbox handle, the uid value should be a number - the message UID, the addresses should be a string containing one E-mail address or several E-mail addresses separated with the comma (,) symbols.\nThese functions return a null-value if the operation has succeeded, otherwise they return a string with an error code.';
            break;
        }
        case 122: {
            item.detail = '(CG/PL) MailboxForwardByUID(boxRef,uid,addresses)';
            item.documentation = 'This function forward the specified message to the specified E-mail addresses.\nThe boxRef value should be a Mailbox handle, the uid value should be a number - the message UID, the addresses should be a string containing one E-mail address or several E-mail addresses separated with the comma (,) symbols.\nThese functions return a null-value if the operation has succeeded, otherwise they return a string with an error code.';
            break;
        }
        case 123: {
            item.detail = '(CG/PL) MailboxAppend(boxRef,headers,content)';
            item.documentation = 'This function composes an E-mail message and appends it to the Mailbox.\nThe boxRef value should be a Mailbox handle.\nThe headers and content values are processed in the same way they are processed with the SubmitEMail function.\nThe headers dictionary may contain the following additional elements: flags - a string that specifies the message flags the newly created message will have in the Mailbox. Several flags can be specified, separated with the comma symbol. See the Mailbox section for more details. internalDate - a timestamp value with the "internal timestamp" for the newly created message. If absent, the current time is used. replacesUID, replaceMode - an UID value for the previous version of this message. The meaning is the same as the meaning of these attributes in the XIMSS messageAppend operation. report - if this element is specified, it should have the "uid" value. \nIf the content value is a vCardGroup XML object, a Contacts item is composed (regular headers elements are ignored), and this item is added to the Mailbox. \nIf the operation has failed, this function returns a string with an error code. \nIf the operation has succeeded, this function returns a null-value, or, if the report element was specified in the headers dictionary, the function returns a number - the UID value of the newly created Mailbox message.';
            break;
        }
        case 124: {
            item.detail = '(CG/PL) MailboxCopy(boxRef,idData,parameters)';
            item.documentation = 'This function copies or moves messages from one Mailbox to some other Mailbox.\nThe boxRef value should be a Mailbox handle. \nThe uid value should be either a number or an array of numbers or "ranges", where a "range" is an array with 2 numbers as its elements. The "range" includes its "start" and "end" numbers, and all the numbers in between. \nAll these numbers specify the set of UIDs or Mailbox indeces of the message(s) to be copied. \nIf the uidData value is the 123 number, the message with UID 123 is copied. If the uidData value is the (123, 125, 130) array, the messages with UIDs 123,125,130 are copied. If the uidData value is the (123, (125,128), 130) array, the messages with UIDs 123,125,126,127,128,130 are copied.\nIf the parameters value is a string, it specifies the target Mailbox name. \nOtherwise, the parameters value should be a dictionary with the following elements: targetMailbox - the target Mailbox name string. doMove - if this element is present, the original messages are removed after they have been successfully copied. mailboxClass - if this element value is a string, and the targetMailbox Mailbox does not exist, that Mailbox is created. \nIf the element value is a non-empty string, that value is assigned as the Mailbox Class to the newly created Mailbox. useIndex - if this element is present, the set specified with the idData value is interpreted as a set of message index values in the boxRef "mailbox view". This element can be present only if the boxRef handle was open using the OpenMailboxView function. Otherwise this function call results in a program exception. report - if this element is present, the function returns an array of numbers - the UIDs of copied messages created in the target Mailbox. \nThis function returns a null-value or an array if the operation has succeeded, otherwise it returns a string with an error code.';
            break;
        }
        case 125: {
            item.detail = '(CG/PL) GetMessageAttr(boxRef,uid)';
            item.documentation = 'This function retrieves Message attributes.\nThe boxRef value should be a Mailbox handle, the uid value should be a number - the message UID.\nIf the function succeeds, it returns a dictionary with the message attribute values, otherwise it returns a string with an error code.';
            break;
        }
        case 126: {
            item.detail = '(CG/PL) UpdateMessageAttr(boxRef,uid,newData)';
            item.documentation = 'This function modifies Message attributes.\nThe boxRef value should be a Mailbox handle, the uid value should be a number - the message UID.\nThe newData value should be a dictionary with new attribute values. To remove an attribute, set its value to the "default" string.\nIf the function succeeds, it returns a null-value, otherwise it returns a string with an error code.';
            break;
        }
        case 127: {
            item.detail = '(CG/PL) OpenMessage(boxRef,uid)';
            item.documentation = 'This function opens a Message Handle.\nThe boxRef value should be a Mailbox handle, the uid value should be a number - the message UID.\nThe function returns a Message Handle if the message has been opened successfully, otherwise it returns a null-value.';
            break;
        }
        case 128: {
            item.detail = '(CG/PL) MessagePart(msgRef,type)';
            item.documentation = 'The msgRef value should be a Message Handle.\nIf the type value is a null-value, this function returns a dictionary containing the message MIME structure.\nOtherwise, the type value should be a string. It specifies the message subpart to search for: audio - a subpart with audio/* Content-Type. plain - a subpart with text/plain Content-Type. text - a subpart with text/* Content-Type. If several alternative subtypes are available, the text/plain part has the lowest priority, followed by text/html part. If a subpart is found, this function returns a dictionary with this subpart MIME structure.\nIf no subpart is not found, the function returns a null-value.\nIf the message cannot be read or parsed, the function returns an error code string.\nThe dictionary elements are: estimatedSize - estimated size of the message (or message part) decoded body. filename - optional - the decoded message part file name. Content-Type - the message (or message part) content type string (such as "text", "image", etc.) Content-Subtype - the message (or message part) content subtype string (such as "plain", "jpeg", etc.) DispositionParams - a dictionary with Content-Disposition field parameters ContentTypeParams - a dictionary with Content-Type field parameters MIMEPartID - This element is an empty string for the message itself. For message subparts, this element is a string with the message part ID. MIMEParts - an array of MIME subparts. Each array element is a dictionary with subpart MIME structure. contentFieldName - a string with Content-contentFieldName field value';
            break;
        }
        case 129: {
            item.detail = '(CG/PL) MessageHeader(msgRef,partID,fieldName)';
            item.documentation = 'This function returns an array of the specified message header fields, or a dictionary with all message header fields. If the message cannot be read or parsed, the function returns an error code string.\nThe msgRef value should be a Message Handle.\nIf the partID is a null-value, then the message header fields are returned.\nIf the partID is a string, it should be a message part ID, and that message part should be of the text/rfc822headers type, or it should be the (only) subpart of the message/rfc822 part. The header fields of the specified message part are returned.\nIf the fieldName value is a string, it specifies the message header field name, and the function value is an array of the specified field values.\nOtherwise, the fieldName value should be a null-value. In this case the function value is a dictionary: the dictionary keys are the names of all message header fields, and their values are arrays with the corresponding field values. \nIf the field name specifies an Email-type field ("From", "To", "Sender", etc.) then the field value is a dictionary. The dictionary element with an empty ("") key is the parsed E-mail address. An optional realName element contains the address "comment" string.\nIf the field name is a "E-emailField" string, where emailField is an Email-type field name, then the field value is a string with the parsed E-mail address.\nIf the field name is a date-type field ("Date","Resent-Date"), then the field value is a timestamp.\nIn all other cases, the field value is a string containing the field data, MIME-decoded and converted into the UTF-8 character set. Example: the msgRef Message Handle references a message with the following header: From: "Sender Name" <fromName@domain>\nSubject: I\'ll be there!\nTo: "Recipient Name" <toName@domain>, <toName1@domain1>, \nTo: <toName2@domain2>\nCc: "Cc Name" <toName3@domain3>\nMIME-Version: 1.0\nX-Mailer: SuperClient v7.77\nDate: Fri, 24 Oct 2008 02:51:24 -0800\nMessage-ID: <ximss-38150012@this.server.dom>\nContent-Type: text/plain; charset="utf-8"\n Then the MessageHeader(msgRef,null,"To") returns ({""="toName@domain",realName="Sender Name"},{""="toName1@domain1"},{""="toName2@domain2"}) the MessageHeader(msgRef,null,"E-Cc") returns ("toName3@domain3") and the MessageHeader(msgRef,null,null) returns { \nCc = ({""="toName3@domain3",realName="Cc Name"}); \nDate = (#T24-10-2008_10:51:24); \nFrom = ({""="fromName@domain",realName="Sender Name"}); \nMessage-ID = ("<ximss-38150012@this.server.dom>"); \nSubject = ("I\'ll be there!"); \nTo=({""="toName@domain",realName="Recipient Name"},{""="toName1@domain1"},{""="toName2@domain2"}); \nX-Mailer = ("SuperClient v7.77"); \n}';
            break;
        }
        case 130: {
            item.detail = '(CG/PL) MessageBody(msgRef,partID)';
            item.documentation = 'This function returns the message or message part body.\nThe msgRef value should be a Message Handle.\nIf the partID is a null-value, then the entire message body is returned.\nIf the partID is a string, it should be a message part ID. The message part body is returned.\nIf the message cannot be read, or if the specified message part is not found, this function returns an error code string.\nIf the message or message part Content-Type is text/*, the function reencodes the result using the UTF-8 character set.\nIf the message or message part Content-Type is text/xml, the function returns a parsed XML object.\nFor all other Content-Types, the function returns a datablock with the message body data.';
            break;
        }
        case 131: {
            item.detail = '(CG/PL) OpenCalendar(mailboxName)';
            item.documentation = 'This function opens the specified Mailbox as a Calendar. The mailboxName value should be a string. It specifies the Mailbox name.\nIf the name does not start with the ~ symbol, the Mailbox is opened in the current Account, if any.\nThe current Account (if any) must have the Read/Select access right for the specified Mailbox.\nThe function returns a Calendar handle if the Mailbox has been opened successfully and the Calendar is built using its content, otherwise the function returns an error code string.';
            break;
        }
        case 132: {
            item.detail = '(CG/PL) Find(calendarRef,params)';
            item.documentation = 'This function retrieves all calendar events falling into the specified time interval.\nThe calendarRef value should be a Calendar handle, and the params value should be a dictionary. \nThe params dictionary should contain the required timeFrom and timeTill elements with the timestamp values, and optional limit and skip number elements, and an optional byAlarm element. These elements have the same meanings as the attributes of the findEvents XIMSS operation. \nIf the function fails, it returns an error code string. Otherwise, it returns an array of dictionaries for each 24-hour day (in the selected time zone) included into the specified time interval. \nEach dictionary has the following elements: timeFrom, timeTill, skip, items - these elements have the same meanings as the attributes of the events XIMSS data message events - An array of found Events, represented as dictionaries with the following elements: UID, timeFrom, dateFrom, duration, alarmTime - these elements have the same meanings as the attributes of the event sub-elements of the events XIMSS data message data - the XML presentation of the found Event parent - this element is present if the found Event is an exception of some other Event. The element value is the XML presentation of that parent Event.\nThe value of the data element is included into the parent element value as a sub-element of its exceptions sub-element.';
            break;
        }
        case 133: {
            item.detail = '(CG/PL) ProcessCalendar(calendarRef,params)';
            item.documentation = 'This function applies an operation specified with the params to the specified Calendar.\nThe calendarRef value should be a Calendar handle, and the params value should be a dictionary.\nIf the operation succeeds, this function returns a null-value. Otherwise it returns an error code string. \nThe operation performed is specified with the opCode string element of the params dictionary: "PUBLISH" - The function publishes an Event or a ToDo element in the Calendar. Other params elements: data - an iCalendar element to place into the Calendar. attachments - (optional) array containing the item attachments, each array element specified as an EMail part content. \nIf this element is not specified, and a calendaring item with the same UID already exists in the Calendar, then all attachments are copied from the existing item. To remove all attachments, specify an empty array. sendRequests - this optional string element has the same meaning as the attribute of the XIMSS calendarPublish operation. "CANCEL" - The function removes an Event or a ToDo element from the Calendar. Other params elements: data - an iCalendar element to remove from the Calendar. UID - this optional numeric element has the same meaning as the attribute of the XIMSS calendarCancel operation. - itemUID, sendRequests - these optional string elements have the same meanings as the attributes of the XIMSS calendarCancel operation. recurrenceId - this optional timestamp element has the same meaning as the attribute of the XIMSS calendarCancel operation. requestComment- this optional string element has the same meaning as the body element of the XIMSS calendarCancel operation. "DECLINE" - The function rejects a calendaring item and sends a negative reply the item organizer. Other params elements: data - an iCalendar element to decline. sendReply - this optional string element has the same meaning as the attribute of the XIMSS calendarDecline operation. replyComment - this optional string element has the same meaning as the body element of the XIMSS calendarDecline operation. \nThe calendarRef value can be a null-value. In this case, only a negative reply is generated. "ACCEPT" - The function places a calendaring item into a Calendar and sends a positive reply the item organizer. The existing items(s) with the same UID are replaced. Other params elements: data - an iCalendar element to accept. attachments - this optional element has the same meaning here as for the PUBLISH operation code. PARTSTAT, sendReply - these string elements have the same meaning as the attributes of the XIMSS calendarAccept operation. replyComment - this optional string element has the same meaning as the body element of the XIMSS calendarAccept operation. "UPDATE" - The function updates a calendaring item in a Calendar using a reply-type iCalendar object. This item specifies if a particular attendee has accepted or rejected the invitation. Other params elements: data - an iCalendar "reply" element to use for updating.';
            break;
        }
        case 134: {
            item.detail = '(CG/PL) ReadStorageFile(fileDescr)';
            item.documentation = 'This function reads a File Storage file.\nIf the fileDescr value is a string, it specifies the name of the File Storage file to read. The entire file is read - and only files not larger than 1MB in size can be read this way. \nIf the fileName value is a dictionary, the following dictionary elements are used: fileName - a string - the name of the file to read position - an optional element. Its value should be a non-negative number, it specifies the file position (in bytes) from which reading should start. limit - an optional element. Its value should be a non-negative number, it specifies the maximum data length to read (in bytes). If the file is shorter than starting position plus the read limit, a shorter datablock is read. This value should not exceed 1MB. \nThis function returns a datablock value with the file content, or a null-value if the specified file could not be read.';
            break;
        }
        case 135: {
            item.detail = '(CG/PL) WriteStorageFile(fileDescr,data)';
            item.documentation = 'This function stores the data value (which should be either a datablock or a string) into the specified File Storage file.\nIf the fileDescr value is a string, it specifies the name of the file to write to. The entire file is rewritten. \nIf the fileName value is a dictionary, the following dictionary elements are used: fileName - a string - the name of the file to write position - an optional element. If present, the file is not completely rewritten.\nIf this element value is a non-negative number, it specifies the file position (in bytes) from which writing should start.\nIf this element value is the "end" or "append" string, the writing operation starts from the current file end.\nIf this element value is the "new" string, the writing operation checks that the file does not already exist. \nThis function returns a null-value if the file is successfully written, otherwise it returns a string with an error code.';
            break;
        }
        case 136: {
            item.detail = '(CG/PL) AppendStorageFile(fileName,data)';
            item.documentation = 'This function appends the data datablock or string to the end of the fileName File Storage file.\nIf fileName is not a string or data is not a datablock nor it is a string, this function call results in a program exception.\nThis function returns a null-value if the file is successfully written, otherwise it returns a string with an error code.';
            break;
        }
        case 137: {
            item.detail = '(CG/PL) DeleteStorageFile(fileName)';
            item.documentation = 'This function deletes the fileName File Storage file.\nThis function returns a null-value if the file is successfully deleted, otherwise it returns a string with an error code.';
            break;
        }
        case 138: {
            item.detail = '(CG/PL) RenameStorageFile(oldFileName,newFileName)';
            item.documentation = 'This function renames the oldFileName File Storage file into newFileName. Both parameters must have string values.\nThis function returns a null-value if the file is successfully renamed, otherwise it returns a string with an error code.';
            break;
        }
        case 139: {
            item.detail = '(CG/PL) CreateStorageDirectory(directoryName)';
            item.documentation = 'This function creates the directoryName File Storage directory.\nThis function returns a null-value if the directory is successfully created, otherwise it returns a string with an error code.';
            break;
        }
        case 140: {
            item.detail = '(CG/PL) RenameStorageDirectory(oldDirectoryName,newDirectoryName)';
            item.documentation = 'This function renames the oldDirectoryName File Storage directory into newDirectoryName. Both parameters must have string values.\nThis function returns a null-value if the directory is successfully renamed, otherwise it returns a string with an error code.';
            break;
        }
        case 141: {
            item.detail = '(CG/PL) DeleteStorageDirectory(directoryName)';
            item.documentation = 'This function deletes the directoryName File Storage directory. The directory should be empty.\nThis function returns a null-value if the directory is successfully deleted, otherwise it returns a string with an error code.';
            break;
        }
        case 142: {
            item.detail = '(CG/PL) ListStorageFiles(folderName)';
            item.documentation = 'This function returns information about all files in the specified File Storage subdirectory.\nIf folderName is not a string, information about the top-level directory in the current Account File Storage is returned.\nThis function returns a null-value if an error occurred. Otherwise, the function returns a dictionary. Each dictionary key is a file or a subdirectory name, and the dictionary value is a dictionary with the following elements: STFileSize - a numeric value with the file size in bytes. This element is present for files and absent for subdirectories. STCreated - (optional) a timestamp value with the file creation date. STModified - a timestamp value with the file modification date. MetaModified - (optional) a timestamp value with the file or subdirectory attribute set modification date.';
            break;
        }
        case 143: {
            item.detail = '(CG/PL) ReadStorageFileAttr(fileName,attributes)';
            item.documentation = 'This function reads attributes of the fileName File Storage file or file directory.\nIf fileName is not a string or attributes is neither an array nor a null-value, this function call results in a program exception.\nThe attributes value should be either a null-value (then all file attributes are retrieved), or an array of strings - then only the attributes with names included into the array are retrieved.\nIf attributes are successfully retrieved, this function returns an array of file attributes (each attribute is an XML object). Otherwise the function returns a string with an error code.';
            break;
        }
        case 144: {
            item.detail = '(CG/PL) WriteStorageFileAttr(fileName,attributes)';
            item.documentation = 'This function modifies attributes of the fileName File Storage file or file directory.\nIf fileName is not a string or attributes is not an array, this function call results in a program exception.\nThe attributes value should be an array of XML objects. See the XIMSS section for more details.\nThis function returns a null-value if the attributes have been successfully updated, otherwise it returns a string with an error code.';
            break;
        }
        case 145: {
            item.detail = '(CG/PL) LockStorageFile(fileName,params)';
            item.documentation = 'This function manages "locks" of the fileName File Storage file or file directory.\nIf fileName is not a string or params is not a dictionary, this function call results in a program exception.\nThe params value should be a dictionary with lock request parameters. See the XIMSS section for more details.\nThis function returns a dictionary if the operation has been completed successfully, otherwise it returns a string with an error code.';
            break;
        }
        case 146: {
            item.detail = '(CG/PL) ReadRoster()\nReadRoster(accountName)';
            item.documentation = 'This function retrieves Roster items. \nIf the the accountName parameter is not specified, or if its value is a null-value, the current Account Roster is read, otherwise the accountName value should be a string specifying the name of the Account to read Roster items from.\nThis function returns a dictionary with Roster items, where dictionary keys are contact E-mail addresses, and dictionary values are dictionaries with the following elements: Inp - the "incoming" subscription mode: it controls if the contact can watch the user presence. Possible values: null-value, true-value, "Pending", "Blocked". Out - the "outgoing" subscription mode: it controls if the user can watch the contact presence. Possible values: null-value, true-value, "Pending". RealName - the contact real name string (optional). If the function fails to retrieve Roster items, it returns an error code string.';
            break;
        }
        case 147: {
            item.detail = '(CG/PL) SetRoster(params)\nSetRoster(params,accountName)';
            item.documentation = 'This function updates a Roster item.\nIf the the accountName parameter is not specified, or it value is a null-value, the current Account Roster is updated, otherwise the accountName value should be a string specifying the name of the Account to update.\nThe params should be a dictionary with the following elements: peer - The contact E-mail address string ("accountName@domainName"). what - The operation type string: "update": update the contact information. "remove": remove the contact from the Roster. "subscribed": confirm the contact request to monitor the user\'s presence information. "unsubscribed": reject the contact request to monitor the user\'s presence information, or revoke the already granted right to monitor. "subscribe": send a request to monitor the contact\'s presence information. "subBoth": confirm the contact request to monitor the user\'s presence information, and send a request to monitor the contact\'s presence information. "unsubscribe": stop monitoring the contact\'s presence information. data - optional - a dictionary containing new contact info.';
            break;
        }
        case 148: {
            item.detail = '(CG/PL) DatasetList(datasetName,filterField,filterValue)';
            item.documentation = 'This function retrieves data entries from an Account dataset.\nThe datasetName value should be a string with the dataset name.\nThe filterField, filterValue values should be null-values or strings. If the values are strings, they specify an entry attribute name and value. Only the entries that have the specified attribute with the specified value are included into the resulting value.\nThis function returns a dictionary with dataset entries. The dictionary keys are entry names, the dictionary elements are data entries. Each data entry is a dictionary containing the data entry attributes.\nIf the dataset entries could not be retrieved, the function returns an error code string.';
            break;
        }
        case 149: {
            item.detail = '(CG/PL) DatasetCreate(datasetName)';
            item.documentation = 'This function creates an Account dataset.\nThe datasetName value should be a string; it specifies the dataset name.\nIf the dataset is created successfully, the function returns a null-value. Otherwise the function returns an error code string.';
            break;
        }
        case 150: {
            item.detail = '(CG/PL) DatasetRemove(datasetName,ifExists)';
            item.documentation = 'This function removes an Account dataset.\nThe datasetName value should be a string; it specifies the dataset name.\nIf the ifExists value is not a null-value, and the dataset to be removed already does not exist, the function does not return an error code.\nIf the dataset is removed successfully, the function returns a null-value. Otherwise the function returns an error code string.';
            break;
        }
        case 151: {
            item.detail = '(CG/PL) DatasetSet(datasetName,entryName,entryData,ifExists)';
            item.documentation = 'This function modifies data entries in an Account dataset.\nThe datasetName value should be a string; it specifies the dataset name.\nThe entryName value should be a string; it specifies the entry name.\nThe entryData value should be a dictionary; it specifies the entry data (attributes).\nIf the ifExists value is a null-value, then the dataset is created if it does not exist, and the entry with the specified name is created if it does not exist.\nIf the dataset is updated successfully, the function returns a null-value. Otherwise the function returns an error code string.';
            break;
        }
        case 152: {
            item.detail = '(CG/PL) DatasetDelete(datasetName,entryName,ifExists)';
            item.documentation = 'This function deletes a data entry from an Account dataset.\nThe datasetName value should be a string; it specifies the dataset name.\nThe entryName value should be a string; it specifies the entry name.\nIf the ifExists value is not a null-value, and the entry to be deleted already does not exist, the function does not return an error code.\nIf the dataset is removed successfully, the function returns a null-value. Otherwise the function returns an error code string.';
            break;
        }
        case 153: {
            item.detail = '(CG/PL) DirectorySearch(baseDN,filter,parameters)';
            item.documentation = 'This function performs a directory search, returning a dictionary with found records.\nThe baseDN value should be a string with the search base DN. If this value is "$", the Directory Integration settings are used to compose the base DN for the current Domain.\nThe filter value should be a null-value, or a string with a search filter, in the RFC2254 format.\nThe parameters value should be a null-value or a dictionary containing search options: limit - If this option value is a positive number, it specifies the maximum number of records to return. Otherwise, the record limit is set to 100. keys - If this option value is "DN", the resulting dictionary keys are full record DNs. Otherwise, the record RDNs are used as resulting dictionary keys. scope - If this option value is "sub", a subtree search is performed. Otherwise, only the direct children of the base DN record are searched. attributes - If this option value is an array of strings, only the attributes listed in the array are included into resulting records. \nOtherwise, all record attributes are included into resulting records. \nIf the directory search operation fails (no base DN record, insufficient access rights, etc.), this function returns an error code string.';
            break;
        }
        case 154: {
            item.detail = '(CG/PL) GetLanguage()';
            item.documentation = 'This function value is a string with the currently "selected language".';
            break;
        }
        case 155: {
            item.detail = '(CG/PL) SetLanguage(lang)';
            item.documentation = 'This procedure sets the "selected language". The lang value should be a string with the language name, or a null-value to select the default language.';
            break;
        }
        case 156: {
            item.detail = '(CG/PL) GetTimeZoneName()';
            item.documentation = 'This function value is a string with the currently selected time zone name. If no time zone is selected (the Server time offset is used), the function returns a null-value.';
            break;
        }
        case 157: {
            item.detail = '(CG/PL) SetTimeZone(zoneName)';
            item.documentation = 'This procedure sets the current time zone. The zoneName value should be a string with a known time zone name. If an unknown zone name is specified, or if the zoneName value is not a string, the no zone fictitious value is set, and the Server current time offset is used.';
            break;
        }
        case 158: {
            item.detail = '(CG/PL) ReadEnvirFile(fileName)';
            item.documentation = 'This function retrieves the specified file from the current "environment" - such as the Real-Time Application environment.\nThis function value is a datablock with the file content or a null-value if the specified file does not exist.';
            break;
        }
        case 159: {
            item.detail = '(CG/PL) SysLog(arg)';
            item.documentation = 'This procedure places the textual representation of the arg value into the Server Log.';
            break;
        }
        case 160: {
            item.detail = '(CG/PL) SysProfile(arg)';
            item.documentation = 'If the arg value is a null-value, the procedure decreases an internal integer profile level counter by 1, otherwise it increases it by 1.\nThe profile level counter is set to zero when the program starts.\nWhen the profile level counter is positive, profiling records are placed into the Server Log when every user-defined and some built-in functions and procedures are entered and exited.';
            break;
        }
        case 161: {
            item.detail = '(CG/PL) ExecuteCLI(arg)';
            item.documentation = 'This function executes the Command Line Interface (CLI) command. \nThe arg value should be a string containing one CLI command. \nIf the CLI command has been executed successfully, this function returns a null-value. Otherwise this function returns an error code string. \nIf the CLI command has produced an output, it is placed into the Task variable executeCLIResult (it can be accessed as Vars().executeCLIResult. \nIf the CLI command has failed, or it has not produced any output, this Task variable is assigned a null-value.';
            break;
        }
        case 162: {
            item.detail = '(CG/PL) SetApplicationStatus(arg)';
            item.documentation = 'This procedure copies its argument and stores is in the current Task descriptor.\nExternal modules and entities can retrieve this information from the Task descriptor.';
            break;
        }
        case 163: {
            item.detail = '(CG/PL) StoreCDR(arg)';
            item.documentation = 'This procedure sends the arg value (which should be a string) to the External CDR Processor program.\nThe "APP" prefix is added to the arg value, and the application is supposed to provide its name and the version number as the first part of the arg value to allow the External CDR Processor program to differentiate records generated with different applications: APP arg';
            break;
        }
        case 164: {
            item.detail = '(CG/PL) DoBalance(parameters,accountName)';
            item.documentation = 'This function performs a Billing operation.\nIf the accountName is null, the operation is applied to the current Account. Otherwise, the accountName value must be a string specifying the target Account name. In any case, the operation is subject to the Access Rights restrictions.\nThe parameters value must be a dictionary. It specifies the operation parameters, see the Billing section for the details. The operation name should be specified as the value of the dictionary key "op".\nThe function returns an error code string if the operation has failed.\nOtherwise the function returns a dictionary with the operation results (as specified in the Billing section).';
            break;
        }
        case 165: {
            item.detail = '(CG/PL) Statistics(elementName,opCode,setValue)';
            item.documentation = 'This function reads and updates the Server Statistics Element value.\nThe elementName value should be a string specifying either a Custom Statistics Element name.\nThe setValue value should be a numeric value.\nThe opCode value should be a null-value or a string. If the string value is "inc", then the Element value is increased by the setValue value. If the string value is "set", then the Element value is set to the setValue value. If the value is a null-value, then the Element value is not modified. \nOnly the Custom Statistics Elements can be modified. \nThe function returns either a number - the current Statistics Element value, or an error code string.';
            break;
        }
        case 166: {
            item.detail = '(CG/PL) BannerRead(type,parameters)';
            item.documentation = 'This function sends a request to the External Banner System.\nThe type value should be a string specifying the banner type (application-specific, such as "prontoEmailTop", "myClientLeftBanner").\nThe parameters value is passed to the External Banner System.\nThe function returns the banner data object from the External Banner System response (it may return a null-value).';
            break;
        }
        case 167: {
            item.detail = '(CG/PL) HTTPCall(URL,parameters)';
            item.documentation = 'This function performs an HTTP transaction.\nThe current Account must have the HTTP Service enabled.\nThe URL value should be a string. It specifies the request URL.\nThe parameters value should be either a null-value or a dictionary. It specifies the request parameters and, optionally, the request body.\nThese values, along with the maximum time-out time of 30 seconds are passed to the HTTP Client module for processing. \nThis function returns either a result dictionary the HTTP module produced, or an error code string.';
            break;
        }
        case 168: {
            item.detail = '(CG/PL) SubmitEMail(headers,content)';
            item.documentation = 'This function composes and sends an E-mail message.\nThe headers value should be a null-value or a dictionary. This dictionary specifies the header field values for the composed E-mail message. The following elements are processed (all of them are optional): From - the element value should be an E-mail address string. It specifies the message From: address To - the element value should be an E-mail address string or an array of E-mail address strings. It specifies the message To: address(es) Cc - the element value should be an E-mail address string or an array of E-mail address strings. It specifies the message Cc: address(es) Bcc - the element value should be an E-mail address string or an array of E-mail address strings. It specifies the message Bcc: address(es) Subject - the element value should be a string. It specifies the message Subject: field. Date - the element value should be a timestamp. It specifies the message Date: field. If this element is absent, the current time is used. sourceType - the element value should be a string. It specifies the message source. If this element is absent, the "CGPL" string value is used. sourceAddress - the element value should be a string. It specifies the address of the message source (network address, remote system name, etc.) Message-ID - the element value should be a string. It specifies the message Message-ID: field. If this element is absent, an automatically generated string is used. protocol - the element value should be a string. It specifies the name of the protocol used to submit this message. Content-Class - the element value should be a string. It specifies the E-mail header Content-Class: field value. X-Priority - the element value should be a string. It specifies the E-mail header X-Priority: field value. X-Mailer - the element value should be a string. It specifies the message X-Mailer: field. If this element is absent, an automatically generated string is used. The content value specifies the E-mail message body. If the value is a dictionary, then the dictionary body element is the actual content, and other dictionary elements specify various body parameters (content header fields). Otherwise the content itself is the actual content and the content body parameters set is an empty one.\nThe following content body parameters (dictionary elements) are processed (all of them are optional): Content-Type - the element value should be a string. It specifies the content body Content-Type. If this element is not specified, the Content-Type is set to "text" if the actual content is a string, otherwise it the Content-Type is set to "application" Content-Subtype - the element value should be a string. It specifies the content body Content-Type subtype. If this element is absent, and the Content-Type is set to "text", the Content-Subtype is set to "plain" filename - the element value should be a string. It specifies the content body file name. Content-Disposition - the element value should be a string. It specifies the content body Content-Disposition. If this element is absent, and the fileName element is present, the Content-Disposition value is set to "attachment" \nIf the actual content is a string, it is stored "as is", using the 8bit Content-Transfer-Encoding.\nIf the actual content is a datablock, it is stored using the base64 Content-Transfer-Encoding.\nIf the actual content is an array, the content is a multi-part one. Only the Content-Subtype parameter element is used, if it is absent, the "mixed" value is used.\nEach array element is stored in the same way as the content value itself.\nIf the actual content is not an array, a string, or a datablock, an empty content body is stored.\nThis function returns a null-value if an E-mail message has been composed and sent (submitted to the Queue). Otherwise, this function returns an error code string. In the following example, a simple text message is sent. headers = NewDictionary();\nheaders.From = "from@sender.dom";\nheaders.Subject = "Test Message";\nheaders.To = "To@recipient.dom";\nresult = SubmitEmail(headers,"Test Message Body\eEnd Of Message\e"); In the following example, a multipart/mixed message is sent. It contains an HTML text and a binary attachment. content = NewArray();\ntextPart = NewDictionary();\ntextPart.("Content-Type") = "text";\ntextPart.("Content-Subtype") = "html";\ntextPart.body = "<HTML><BODY>This is an <B>HTML</B> text</BODY></HTML>";\ncontent[0] = textPart;\ndataPart = NewDictionary();\ndataPart.("Content-Type") = "image";\ndataPart.("Content-Subtype") = "gif";\ndataPart.fileName = "file.gif";\ndataPart.body = ReadStorageFile(dataPart.fileName);\ncontent[1] = dataPart;\nheaders = NewDictionary();\nheaders.From = "from@sender.dom";\nheaders.Subject = "Test Attachment";\nheaders.To = "To@recipient.dom";\nheaders.("Content-Class") = "message";\nresult = SubmitEMail(headers,content); It is possible to include parts of other E-mail messages into a newly composed one. If there is a content body parameter MIMEPartID with a string value, then there must be a content body parameter source with a Message Handle value. \nIf the MIMEPartID parameter value is "message", the entire source Message is copied (as a message/rfc822 MIME part body).\nIf the MIMEPartID parameter value is any other string, it specifies the MIME part of the source Message to be copied into the new message; when copying the part headers, only the MIME (Content-xxxxxx) fields are copied. content = NewArray();\ntextPart = NewDictionary();\ntextPart.("Content-Type") = "text";\ntextPart.("Content-Subtype") = "plain";\ntextPart.body = "Please see the attached letter.\e";\ncontent[0] = textPart;\nattachPart = NewDictionary();\nattachPart.("source") = MyOldMessage;\nattachPart.("MIMEPartID") = "message";\ncontent[1] = dataPart;\nheaders = NewDictionary();\nheaders.From = "from@sender.dom";\nheaders.Subject = "Test Forwarded message";\nheaders.To = "To@recipient.dom";\nheaders.("Content-Class") = "message";\nresult = SubmitEMail(headers,content);';
            break;
        }
        case 169: {
            item.detail = '(CG/PL) SendEMail(fromAddress,subject,to,headers,content)';
            item.documentation = 'This function composes and sends an E-mail message. A call to this function does the same as the SubmitEMail(headers,content) function call, where the fromAddress, subject, and to value (if they are not null-values) are used instead of the headers dictionary From,Subject, and To elements. In the following example, a simple text message is sent. result = SendEmail("from@sender.dom","Test Message","To@recipient.dom", \nnull,"Test Message\eEnd Of Message\e");';
            break;
        }
        case 170: {
            item.detail = '(CG/PL) SendInstantMessage(fromAddress,toAddress,content)';
            item.documentation = 'This function sends an Instant Message.\nThe fromAddress value should be a string or a null-value. It specifies the message From (sender) address. \nIf this value is a null-value, then the sender address is the current Account address. \nIf this value is a string, but it does not contain a @ symbol, the sender address is the current Account address, and this value is used as the sender "instance" name. \nIf this value contains a @ symbol, it can also specify the sender "instance" name, as in "user@domain/instance" string.\nThe toAddress value should be a string. It specifies the message To (recipient) address. \nIt must contain the @ symbol and it can specify the recipient "instance" name, as in "user@domain/instance" string.\nThe content value should be a string or a dictionary. If the value is a string, it specifies the message content. If the value is a dictionary, it can contain the following elements: "" (empty string) - this optional element should be a string - the instant message body. type - this optional element should be a string - the instant message XMPP-style type - "chat", "groupchat", etc. id - this optional element should be an string - it specifies the IM request "id" attribute. suppl - this optional element should be an array of XML objects to be sent inside the instant message. IMSubject - this optional element should be a string - the instant message subject. IMState - if this optional element is present, the "" (body), IMSubject and suppl elements should not be used. This element should be one of the strings "gone", "composing", "paused", "active", and informs the recipient about the sender intentions. \nThe function only initiates an Instant Message signaling operation, it does not wait for the message delivery operation to complete.\nThis function returns a null-value if an Instant Message has been composed and sent (submitted to the Signal component). Otherwise, this function returns an error code string.';
            break;
        }
        case 171: {
            item.detail = '(CG/PL) SendXMPPIQ(fromAddress,toAddress,content)';
            item.documentation = 'This function sends an XMPP-style IQ request or a presence request.\nThe fromAddress and toAddress values have the same meaning as for the SendInstantMessage function.\nThe content value should be a dictionary with the following elements: type - this element should be a string - "get", "set", "result", etc. To send a presence request, this element should be "cgp_presence". suppl - this element should be an array of XML objects to be sent inside the IQ request. id - this element should be an string - it specifies the IQ request "id" attribute. This element is not used for presence requests. opcode - this element should be an string, it is used for presence requests only. It specifies the presence request "type" attribute value, such as "unavailable". status - this element should be an string, it is used for presence requests only. It specifies the presence state, such as "online", "busy", etc.\nThe function only initiates an signaling operation, it does not wait for the operation to complete.\nThis function returns a null-value if a request has been composed and sent (submitted to the Signal component). Otherwise, this function returns an error code string.';
            break;
        }
        case 172: {
            item.detail = '(CG/PL) RADIUSCall(address,parameters)';
            item.documentation = 'This function composes and sends a RADIUS request.\nThe address value should be an ip-address. It specifies the address and the port of the RADIUS server to send the request to.\nThe parameters value should be a dictionary with the following elements: Type - this element should be a string. It specifies the type of RADIUS request to send\n "authenticate", "accountingStart", "accountingUpdate", "accountingStop". Secret - this element should be a string. It specifies the "shared secret" of the RADIUS server. Username - his element should be a string. It is used to compose the userName (1) request attribute. Password - this element should exist in the authenticate requests, and it should be a string. It contains the clear text password to use in the authentication operation. nn (where nn is a decimal number) - these elements specify additional request attributes (by their attribute numbers).\nThese element values should be strings, or (for the integer-type parameters) - numbers, or (for Internet-type parameters) ip-addresses.\nIf an element value is a datablock, then the content of the datablock is sent without any encoding.\nIf an element value is an array, then the request attribute is added to the request zero or more times, once for each array value. -nnnnn (where nnnnn is a decimal number) - these elements specify additional vendor-specific attributes (where nnnnn is the VendorID). See the RADIUS section to see more on the vendor-specific attribute presentation. Error - if this optional element value is "data", and a denied-response is received for an authentication request, the function returns a response attribute dictionary (see below) with an additional Error element. \nIf this optional element value is not "data", and a denied-response is received for an authentication request, the function returns an error string. Retries - this optional element should be a number or a numeric string in the [1..20] range. It overrides the default limit of request resends. Set this element to 1 if you want the RADIUS request to be sent only once. Timeout - this optional element should be a number or a numeric string in the [0..30] range. It overrides the default timeout value (in seconds). When a response is not received within the specified time, the request is resent or an error message is produced.\nIf the RADIUS operation succeeds, this function returns a dictionary. This dictionary contains attributes the RADIUS server sent in its response. If the RADIUS fails, this function returns a string with an error code. \nNote: requests are sent using the UDP socket of the RADIUS module, so this module should be enabled (it should be configured to use some non-zero port number). In the following example, a RADIUS authentication request is sent. The request contains the nasIdentifier (32) text attribute. callParam = newDictionary();\ncallParam.Type = "authenticate";\ncallParam.Secret = "sys2";\ncallParam.Username = "user4567";\ncallParam.Password = "drum$1245";\ncallParam.("32") = "my NAS";\nresult = RADIUSCall(IPAddress("[10.0.1.77]:1812"),callParam); In the following example, a RADIUS accounting request is sent. The request contains the nasIdentifier (32) text attribute and the acctSessionTime (46) numeric attribute. callParam = newDictionary();\ncallParam.Type = "accountingStart";\ncallParam.Secret = "sys2";\ncallParam.Username = "user4567";\ncallParam.("32") = "my NAS";\ncallParam.("46") = SessionTimeInMinites*60;\nresult = RADIUSCall(IPAddress("[10.0.1.77]:1812"),callParam);';
            break;
        }
        case 173: {
            item.detail = '(CG/PL) ThisTask()';
            item.documentation = 'This function returns the Task handle of the current Task. \nThis function returns a null value if the current environment is not a Task.';
            break;
        }
        case 174: {
            item.detail = '(CG/PL) IsTask(arg)';
            item.documentation = 'This function returns a true-value if the arg value is a Task Handle, otherwise the function returns a null-value.';
            break;
        }
        case 175: {
            item.detail = '(CG/PL) SendEvent(taskRef,eventName)\nSendEvent(taskRef,eventName,eventParam)';
            item.documentation = 'This function sends an Event to a Task. It returns a null value if an Event was sent successfully, or a string with an error code otherwise (for example, when the specified Task does not exist).\nThe taskRef value should be a Task handle.\nThe eventName value should be a string starting with a Latin letter.\nThe optional eventParam parameter value should be a null-value, or a Task handle, or a "basic" object.\nThis function only sends an Event to the specified (target) Task. It does not wait till that Task receives an event, nor does it wait for any response from the target Task.';
            break;
        }
        case 176: {
            item.detail = '(CG/PL) ReadInput(secsToWait)';
            item.documentation = 'Events sent to a task are enqueued, and the task can read the first Event in queue using this function. The function value is a dictionary containing the event data.\nThe secsToWait value should be a non-negative number. \nIf the Task Event queue is empty and the Task does not receive a new Event within the specified number of seconds, the function returns a null-value.\nIf this function returns a dictionary value, the dictionary contains the following elements: what - the Event name string. If the Event was sent using the SendEvent operation, this string is the eventName parameter value used in the SendEvent call in the sender Task. sender - the Task handle of the sender Task (the Task that has sent this event). In a Cluster environment, this Task and the current Task may be running on different Cluster member computers.\nIf the Event is sent by the platform itself, or if the sender was not a Task, the sender element does not exist. parameter - the event parameter. If the event was sent using the SendEvent operation in the sender Task, this element contains the eventParam parameter value of the SendEvent call. Note: depending on the environment, the ReadInput function can return various other objects. For example, if the function is used in a Real-Time Application environment, it can return a string containing the first enqueued DTMF symbol.\nNote: the ReadInput function may have "false wakeups", i.e. it can return the null-object even before the specified time period has elapsed.';
            break;
        }
        case 177: {
            item.detail = '(CG/PL) CreateMeeting(setName,key)\nCreateMeeting(setName,key,parameter)';
            item.documentation = 'This function creates a Meeting object in some Meeting Set within the current Account. \nThe setName parameter specifies the Meeting set name. If its value is a null-value or an empty string, the Default Meeting Set is used.\nThe key parameter must be a string. It specifies a unique ID or name for the new Meeting. For example, an application implementing real-time conferencing can generate a random numeric string to be used as the conference password, and it can create a Meeting using that string. Other Tasks associated with the same Account can find that Meeting (and a Task handle for the Task associated with it) if they know the key and the setName parameter values used with the CreateMeeting operation.\nIf the parameter parameter is specified and its value is not a null-value, that value is stored with the Meeting. Note that the value is stored using its textual representation, so only the standard objects can be used as the parameter values or the parameter value sub-elements. For example, you cannot store Mailbox or Task handles.\nThis function returns a null-value if a Meeting has been created. Otherwise, this function returns an error code string.';
            break;
        }
        case 178: {
            item.detail = '(CG/PL) ActivateMeeting(setName,key)\nActivateMeeting(setName,key,parameter)';
            item.documentation = 'This function adds the Task handle for the current Task to a Meeting in the current Account.\nThe setName and key parameter values specify an already created Meeting.\nThere should be no other Task handle stored in this Meeting.\nThe current Task becomes the Meeting Active Task. \nThe optional parameter parameter value is stored with the Meeting.\nThis function returns a null-value if the Task handle has been successfully added. Otherwise, this function returns an error code string.';
            break;
        }
        case 179: {
            item.detail = '(CG/PL) DeactivateMeeting(setName,key)\nDeactivateMeeting(setName,key,parameter)';
            item.documentation = 'This function removes Task handle for the current Task from a Meeting in the current Account.\nThe setName and key parameter values specify an already created Meeting, and that Meeting should contain a Task handle for the current Task. \nThe optional parameter parameter value is stored with the Meeting.\nWhen this operation completes successfully, the Meeting has no Active Task.\nThis function returns a null-value if the Task handle has been successfully removed. Otherwise, this function returns an error code string.';
            break;
        }
        case 180: {
            item.detail = '(CG/PL) RemoveMeeting(setName,key)';
            item.documentation = 'This function removes a Meeting from a current Account Meeting Set.\nThe setName and key parameter values specify the Meeting to remove.\nThis function returns a null-value if the Meeting has been successfully removed or if the specified Meeting has not been found. Otherwise, this function returns an error code string.';
            break;
        }
        case 181: {
            item.detail = '(CG/PL) FindMeeting(setName,key)';
            item.documentation = 'This function retrieves Meeting information from a current Account Meeting Set.\nThe setName and key parameter values specify the Meeting to look for.\nIf the Account does not have the specified Meeting, the function returns null.\nOtherwise, the function returns the Meeting information dictionary containing the following elements: parameter - the value of the parameter parameter used with the CreateMeeting operation. id - a Task handle for the Active Task, if any.\nIn a Cluster environment, the Active Task and the current Task may be running on different Cluster member computers.';
            break;
        }
        case 182: {
            item.detail = '(CG/PL) ClearMeeting(setName,key)';
            item.documentation = 'This function removes a Task handle from a Meeting (if any).\nThe setName and key parameter values specify the Meeting to clear.\nThis function can be used to clear a reference set by a Task that has died.\nThis function returns a null-value if the Meeting has been successfully cleared. Otherwise, this function returns an error code string.';
            break;
        }
        case 183: {
            item.detail = '(CG/PL) Enqueue(queueName)\nEnqueue(queueName,parameter)\nEnqueue(queueName,parameter,pty)';
            item.documentation = 'This function registers the current Task with the Account associated with it.\nAn Account may have several Queues with Task registrations.\nThe queueName parameter specifies the Queue name. If this parameter value is a null-value or an empty string, the default Queue of the associated Account is used.\nThe optional parameter parameter value is stored with the Task registration. Note that the value is stored using its textual representation, so only the standard objects can be used as the parameter values or the parameter value sub-elements. For example, you cannot store Mailbox or Task handles.\nThe optional pty parameter value should be a string containing a decimal number with one digit, the dot (.) symbol and any number of digits. The Task is placed in the Queue before all other Tasks with a smaller pty parameter value, but after all tasks with the same or larger pty parameter value. \nIf the pty parameter is not specified, or if its value is a null-string, the default "1.0" value is assumed. \nA Task may register itself several times in different Queues, but it can be registered only once with any given Queue. If the Enqueue function is used by a Task that has been already enqueued into the same Queue, the function does not create a second registration. Instead, the function updates the parameter value enqueued with the Task and may change the Task position in the Queue according to the new pty parameter value. \nThe function returns a null-value if registration has failed. If registration was successful, the function returns a dictionary containing the following elements: length - a number - the total number of Tasks in the Queue position - a number - the current position of the current Tasks in the Queue.\nThe position of the first Task in the Queue is 0';
            break;
        }
        case 184: {
            item.detail = '(CG/PL) CheckQueue(queueName)';
            item.documentation = 'This function checks the current Task position in an Account Queue.\nThe queueName parameter specifies the Queue name.\nThe function returns a null-value if it has failed to access the specified Queue. Otherwise, it returns the same dictionary as the Enqueue function.\nNote: the position element exists in the returned dictionary only if the current Task is currently enqueued into the specified Queue. If current Task was not enqueued, or if it has been already removed from the Queue by some other task, this elements will be absent.';
            break;
        }
        case 185: {
            item.detail = '(CG/PL) Dequeue(queueName)';
            item.documentation = 'This procedure removes the current Task from the Account Queue.\nThe queueName parameter specifies the Queue name.';
            break;
        }
        case 186: {
            item.detail = '(CG/PL) ReadQueue(queueName)';
            item.documentation = 'This function retrieves the first Task from the Account Queue.\nThe queueName parameter specifies the Queue name.\nThe function returns a null-value if there is no Tasks in the specified Queue.\nOtherwise, the function returns a dictionary containing the following elements: id - the Task handle for the retrieved Task. In a Cluster environment, this Task and the current Task may be running on different Cluster member computers parameter - the value of the parameter parameter used when the Task was enqueued. Note: this function removes the first Task from the Queue. Unless the retrieved Task re-enqueues itself into the same Queue, no other Task will find it in that Queue.';
            break;
        }
        case 187: {
            item.detail = '(PBXApp) ReadInput(timeOut)';
            item.documentation = 'This function is used to receive external Task communications: DTMF symbol entered by the peer, signals sent by the peer, and Events sent by other Tasks and by the system itself. See the CG/PL Events section for the detail. \nThe timeOut value should be a number specifying the maximum wait period (in seconds). If the timeOut value is zero, the function checks for pending digits and events, without any waiting. \nThe function returns: \na string with the first DTMF symbol in the Task DTMF buffer. The symbol is removed from the Task buffer. \na dictionary with the first waiting Event. The Event is removed from the Task Event queue. \na null-value if no DTMF symbol and no Event was received during the specified time period. \nWhen the peer disconnects, the Task receives a Disconnect Event from the system (this Event dictionary does not contain the .sender element).\n';
            break;
        }
        case 188: {
            item.detail = '(PBXApp) IsDisconnectEvent(input)';
            item.documentation = 'This function returns a true-value if the input value is a Disconnect Event.';
            break;
        }
        case 189: {
            item.detail = '(PBXApp) AcceptCall()';
            item.documentation = 'This function accepts an incoming session, if there is one: the Task should be in the incoming or provisioned mode. \nThis function returns a null-value if the session is accepted successfully, and the Task is placed into the connected mode. \nIf a session cannot be accepted, this function returns an error code string, and the Task is placed into the disconnected mode.';
            break;
        }
        case 190: {
            item.detail = '(PBXApp) RedirectCall(newURI)';
            item.documentation = 'This procedure redirects an incoming session, if there is one: the Task should be in the incoming or provisioned mode. \nThe newURI value should be a string, or an array of strings. The incoming session is redirected to the URI(s) specified and the Task is placed into the disconnected mode.';
            break;
        }
        case 191: {
            item.detail = '(PBXApp) ForkCall(newURI)';
            item.documentation = 'This procedure redirects an incoming session, if there is one: the Task should be in the incoming or provisioned mode. \nThe newURI value should be a string, or an array of strings. The incoming session is directed to the URI(s) specified, and the current Task remains in the same state, so it can accept, reject, redirect, provision, or fork this call later.';
            break;
        }
        case 192: {
            item.detail = '(PBXApp) ProvisionCall(media,reliably)';
            item.documentation = 'This function sends a provisional Response for an incoming session Request, if there is a pending one: the Task should be in the incoming or provisioned mode. \nIf the media value is not a null-value, then a Task Media Channel is created, the Task is placed into the provisioned mode and the Media Channel operations (such as PlayFile) can be used to generate "ring-back tones". \nIf the reliably value is not a null-value, the response confirmation (SIP PRACK) is requested, and the Task is suspended till a confirmation request arrives. \nThis function returns a null-value if the response is sent successfully. \nIf a provisional response cannot be sent, this function returns an error code string.';
            break;
        }
        case 193: {
            item.detail = '(PBXApp) ProvisionCall(parameters)';
            item.documentation = 'This function is an extension of the ProvisionCall function shown above. The function parameters are specified using the parameters dictionary, which can contain the following elements: \nmedia - if this element is present, then it has the same effect as a non-null value of the media parameter of the ProvisionCall function. \nreliably - if this element is present, then it has the same effect as a non-null value of the reliably parameter of the ProvisionCall function. \nresponseCode - if this element is present, its value should be a number in the 101..199 range (inclusive). It specifies the numeric Response code sent. If this element is not present, the 180 value is used. \nresponseText - if this element is present, its value should be a string. It specifies the textual Response code sent. If this element is not present, the default Response text is used. \nreasonCode - if this element is present, its value should be a positive number. The Reason header field is added to the Response, using this element and the reasonText element values. \nIf the element value is less than 1000, the composed field contains SIP as the "protocol" value, otherwise the protocol value is set to Q.850, and 1000 is substracted from the element value. \nreasonText - if this element is present, its value should be a string. This element is used only when the reasonCode element is a positive number.';
            break;
        }
        case 194: {
            item.detail = '(PBXApp) RejectCall(responseCode)';
            item.documentation = 'This procedure rejects an incoming session if there is one: the Task should be in the incoming or provisioned mode. \nThe responseCode value should be a numeric value between 400 and 699, or an error code string. This number is sent back to the caller as the Signal Response code. If the code 401 is sent back, and the request came from outside the CommuniGate Pro Server (via the SIP protocol), the SIP server module adds the proper fields to the response to facilitate client Authentication. \nAlternatively, the responseCode value can be a dictionary with the optional responseCode, responseText, reasonCode, reasonText elements, which have the same meanings as the elements of the ProvisionCall() function parameter. \nThe Task is placed into the disconnected mode.\n Note: if a pending incoming call has been canceled, the Task receives a Disconnect Event, and the Task mode changes to disconnected.\n';
            break;
        }
        case 195: {
            item.detail = '(PBXApp) SetCallParameters(parameters)';
            item.documentation = 'This procedure sets call (INVITE dialog) parameters. \nThe parameters value should be a dictionary with new call option parameters. The existing parameter values are removed. \nThe following parameters are used for all dialog requests: \nMax-Forwards - a positive number used to limit the number of "hops" a request can traverse. \ncustomIdentity - a string or a dictionary to be used as the request P-Asserted-Identity header field. This field is also added to the provisioning responses. \nPrivacy - a string or an array of strings to be used as the request Privacy header field. \nIPSource - the IP Address object that overrides the Server rules and explicitly sets the source IP Address for outgoing SIP packets and locally generated media. \nallowedAudioCodecs - if this parameter is an array, it lists the names of audio codecs that can be included into SDP documents sent with this task. \nallowedVideoCodecs - if this parameter is an array, it lists the names of video codecs that can be included into SDP documents sent with this task. If this array is empty, the sent SDP does not include the "video" media, unless this SDP is an answer to an SDP offer that includes the "video" media. \nallowedSSRC - if this parameter is "NO", all "ssrc" attributes are removed from SDP. \nallowedAttributes - if this parameter is "nonCustom", all custom attributes (with names starting with x-) are removed from SDP. \nif this parameter is "required", all attributes except the required ones are removed from SDP. The "phone", "info", "uri", "email", "time", "zone", "key", "bandwidth", "title" SDP elements are removed, too. \nThe following parameters are used when a call dialog is established: \nSession-Expires - a non-negative number specifying the default session expiration (dialog refreshing) time period. If set to zero, no dialog refreshing takes place. \nSome parameters are used when a call is initiated (with the StartCall, StartBridgedCall functions) or when a call is accepted (with the AcceptCall function) - see below.';
            break;
        }
        case 196: {
            item.detail = '(PBXApp) StartCall(destination)';
            item.documentation = 'This function initiates an outgoing session. The Task should be in the disconnected mode. \nThe destination value should be a string containing the URI to send a session request to, or a dictionary containing the following string elements: \n"" (empty string) - the URI to send the request to. \nFrom (optional) - an E-mail, URI, or field-data to use for the request From field. If not specified, the current Account data is used. \nTo (optional) - an E-mail, URI, or field-data to use for the request To field. If not specified, the request URI is used. \nCall-ID (optional) - a string to use for the request Call-ID field. If not specified, a new Call-ID is generated.\n The following optional parameters are taken from the destination dictionary. If they are absent (or the destination is not a dictionary), they are taken from the current call parameters set with the SetCallParameters procedure: \nauthUsername, authPassword - credentials (the authenticated name and password strings) to be used if an outgoing request is rejected with the 401 error code. \nExpires - a number specifying the maximum calling (alerting) time (in seconds). \nSubject - request Subject string. \nRemote-Party-Id - an array of dictionaries, each used to compose request Remote-Party-Id fields. \nPrivacy - a string or an array of strings to compose the request Privacy field. \nDiversion - an array to compose the request Diversion fields. \nP-CGP-Private - a string to compose the request P-CGP-Private field. This field can be used to pass arbitrary parameters between sending and receiving Tasks (on the same or different systems). \nP-CGP-Local - a string to compose the request P-CGP-Local field. This field can be used to pass arbitrary parameters between sending and receiving Tasks (only within the same single-server or Cluster systems). \nP-Billing-Id - a string to compose the request P-Billing-Id field stored in the Call object. This string is added to the server-generated CDRs. \nCall-Info - an array to compose the request Call-Info fields. \nAlert-Info - a string to compose the request Alert-Info field. \nReplaces - a string or a dictionary to compose the request Replaces field. If a dictionary is used, it should contain the string values Call-ID, fromTag, toTag, and a boolean value early-only. \nVia - if this string parameter is specified, it should contain a URI. The URI is added to the request as its Route field, forcing the request to be sent via that URI. \nNoInitSDP - if this parameter is specified, the call establishment request does not contain the local Media channel SDP. \nNo100rel - if this parameter is specified, the outgoing requests do not have the "100rel" SIP option advertised as supported. \nmediaRelay - if this parameter exists, a Media Proxy is always created for an outgoing call. \nTimerB - if this parameter exists, its numeric value overrides the default "Timer B" value for an outgoing SIP transaction: this is the number of seconds to wait till the remote site sends any response (such as 100-Trying). \nRelay - if this parameter exists and its value is "NO", the outgoing SIP request cannot be relayed to non-client destinations. \nencryptMedia - if this parameter exists and its value is "NO", SDP documents (offers) sent with this task will not include elements needed to enabled media encryption. This function returns an error code string if an outgoing call cannot be initiated. \nIf an outgoing call has been initiated successfully, the function returns a null-value, and the Task starts to receive call progress Events from the system: zero or more provisional response Events, followed by exactly one final response Event. \nIf the outgoing session has been established successfully, the Task receives a final response Event without a parameter. \nIf the outgoing session has not been established, the Task receives a final response Event with a parameter - the error code string.';
            break;
        }
        case 197: {
            item.detail = '(PBXApp) IsCallProvisionEvent(input)';
            item.documentation = 'This function returns a true-value if the input value is a call provisional response Event. Otherwise the function returns a null-value.';
            break;
        }
        case 198: {
            item.detail = '(PBXApp) IsCallCompletedEvent(input)';
            item.documentation = 'This function returns a true-value if the input value is a call final response Event. Otherwise the function returns a null-value. When a Task receives a final response Event, the call signaling process has completed. If the Event has a parameter, the call has failed, and the parameter contains the error code string.';
            break;
        }
        case 199: {
            item.detail = '(PBXApp) CancelCall()';
            item.documentation = 'If a Task has a pending outgoing call (initiated using the StartCall function), this procedure cancels that call (the Task will not receive a final response Event).';
            break;
        }
        case 200: {
            item.detail = '(PBXApp) Disconnect() \nDisconnect(reasonCode,reasonText)';
            item.documentation = 'This procedure ends the active session, if any, and the Task is placed into the disconnected mode. \nIf the reasonCode is specified, its value should be a positive number, and if the reasonText is specified, its value should be a string. If the BYE signal is sent to the peer, the Reason header field with the reasonCode and reasonText values is added to the signal request.';
            break;
        }
        case 201: {
            item.detail = '(PBXApp) IsConnected()';
            item.documentation = 'This function returns a true-value if the Task is in the connected mode.';
            break;
        }
        case 202: {
            item.detail = '(PBXApp) IsHalfConnected()';
            item.documentation = 'This function returns a true-value if the Task is in the connected or provisioned mode.';
            break;
        }
        case 203: {
            item.detail = '(PBXApp) RemoteURI()';
            item.documentation = 'This function returns a string with the peer URI (taken from the dialog From/To addresses). If there is no session in place, the function returns a null-value.';
            break;
        }
        case 204: {
            item.detail = '(PBXApp) LocalURI()';
            item.documentation = 'This function returns a string with the Task URI.';
            break;
        }
        case 205: {
            item.detail = '(PBXApp) IncomingRequestURI()';
            item.documentation = 'This function returns a string with URI of the pending incoming INVITE request. If there is no pending incoming INVITE request, the function returns a null-value.';
            break;
        }
        case 206: {
            item.detail = '(PBXApp) RouteLocalURI(uri)';
            item.documentation = 'This function tries to Route the E-mail address from the specified URI. If the URI cannot be parsed, or the URI address cannot be routed, or it routes to a non-local address (i.e an E-mail address hosted on a different system), this function returns a null-value. Otherwise, the function returns the E-mail address of the CommuniGate Pro user the original URI address is routed to. \nThis function allows you to correctly process all Forwarders, Aliases, and other CommuniGate Pro Routing methods.';
            break;
        }
        case 207: {
            item.detail = '(PBXApp) RemoteIPAddress()';
            item.documentation = 'This function returns an ip-address object the session establishment request was received from or was sent to. This IP Address/port pair is the actual peer address or the address of a proxy used to relay the peer signaling.';
            break;
        }
        case 208: {
            item.detail = '(PBXApp) RemoteAuthentication()';
            item.documentation = 'This function returns a null-value if the session starting request was not authenticated, or a string with the authenticated user E-mail address.';
            break;
        }
        case 209: {
            item.detail = '(PBXApp) PendingRequestData(fieldName)';
            item.documentation = 'This function returns a data element of the pending incoming request. \nIf a request is pending, the function returns the following data, depending on the fieldName value, which should be a string: \nCall-ID - the function returns a string with the request Call-ID value. \nFrom, To, Referred-By - the function returns a dictionary if the field exists in the request. The dictionary contains the following elements: \n"" (and element with empty string key) - the address (in the username@domain form) \n@realName - a string with the "display-name" part of the address \n@schema - a string with the URI schema (if absent, sip is assumed) \n@port - a number with the "port" part of the URI \n@tag - the "tag" field parameter \n@field-params - a dictionary with other field parameters. \n>@headers - a dictionary with URI headers. \nanyOtherName - a URI parameter. \n All elements except the address element are optional. \nRemote-Party-Id, History-Info - the function returns an array if the field or fields exist in the request. Each array element is a dictionary with the same elements as in the From field dictionary. \nForeign-Asserted-Identity - the function returns an array of the request P-Asserted-Identity fields. Each dictionary contains the same elements as the From field dictionary. \nRoute, Record-Route, Diversion, Via, Path, Supported, Require, Proxy-Require, Privacy, Allow, Allow-Events - the function returns an array containing one or more strings with field values. If no field value exists, the function returns a null-value. \nCSeq - the function returns a number - the value of the CSeq field numeric part. \nMax-Forwards - the function returns a number - the value of the Max-Forwards field. \nUser-Agent, Reason, P-CGP-Private, P-CGP-Local - the function returns a string - the field value. If the field is absent, the function returns a null-value. \nAccept - the function returns an array containing 2 strings for each field value: the accepted content type and the accepted content subtype. If the field is absent, the function returns a null-value. \nxmlsdp - the function returns an XML presentation of the pending request SDP.\nIf no request is pending, the function returns a null-value.';
            break;
        }
        case 210: {
            item.detail = '(PBXApp) PendingRequestExData(fieldName)';
            item.documentation = 'This function returns a non-standard data element of the pending incoming request. \nThe fieldName value should be a string. It specifies the name of a non-standard request field. \nIf a request is pending, the function returns specified field data. \nIf no request is pending, the function returns a null-value.';
            break;
        }
        case 211: {
            item.detail = '(PBXApp) SetLocalContactParameter(paramName,paramValue)';
            item.documentation = 'This procedure allows you to add "field" parameters to the Contact field data for this Task dialog(s). \nThe paramName value should be a string. It specifies the field parameter name. \nIf the paramValue value is a non-empty string, it specifies the field parameter value. \nIf the paramValue value is an empty string, a parameter without a value is set (such as isfocus). \nIf the paramValue value is a null-value, a previously set field parameter is removed.';
            break;
        }
        case 212: {
            item.detail = '(PBXApp) DTMF()';
            item.documentation = 'This function returns a string with the current content of the DTMF buffer. The DTMF buffer is not changed. Usually this function is not used, the ReadInput() function is used instead.';
            break;
        }
        case 213: {
            item.detail = '(PBXApp) ClearDTMF()';
            item.documentation = 'This procedure empties the DTMF buffer.';
            break;
        }
        case 214: {
            item.detail = '(PBXApp) SetInterruptOnDTMF(arg)';
            item.documentation = 'This function sets a flag controlling media playing and recording interrupts with received DTMF symbols. \nThe arg value specifies the new flag value: if this value is a null-value, received DTMF symbols will not interrupt media playing or recording, otherwise received DTMF symbols will interrupt media playing and recording. \nWhen a Task is created, this flag value is set to a true-value. \nThe function returns the previous value of this flag.';
            break;
        }
        case 215: {
            item.detail = '(PBXApp) SendDTMF(symbol)';
            item.documentation = 'This function sends a DTMF symbol to the peer. \nThe symbol value should be a string containing 1 DTMF symbol. \nThe function returns a null-value if the symbol has been sent, or a string with an error code if sending failed.';
            break;
        }
        case 216: {
            item.detail = '(PBXApp) PlayFile(fileName) \nPlayFile(fileName,msec)';
            item.documentation = 'This procedure retrieves a file from its Application Environment and plays it. The string parameter fileName specifies the file name. If the specified file name does not contain a file name extension, the supported extensions are added and tried. \nThe file should contain media data in one of the supported formats. \nIf the msec parameter is specified, its value should be a number. Then the specified file is played for msec milliseconds, repeating file in a loop if the file media playing period is shorter than the specified period. If the msec parameter has a negative value, the file is played in an infinite loop. \nPlaying is suppressed or interrupted if the session ends, if the DTMF buffer is not empty (unless DTMF Interruption is disabled), or if there is an Event enqueued for this Task.';
            break;
        }
        case 217: {
            item.detail = '(PBXApp) Play(waveData) \nPlay(waveData,msec)';
            item.documentation = 'This procedure plays the waveData value which should be a datablock. \nThe datablock should contain media data in one of the supported formats. \nIf the msec parameter is specified, it works in the same way as it works for the PlayFile procedure. \nPlaying is suppressed or interrupted if the session ends, if the DTMF buffer is not empty (unless DTMF Interruption is disabled), or if there is an Event enqueued for this Task.';
            break;
        }
        case 218: {
            item.detail = '(PBXApp) PlayTone(freq,msec) \nPlayTone(freq,msec,freq2) \nPlayTone(freq,msec,freq2,ratio)';
            item.documentation = 'This procedure plays a "tone" (a sine wave). The freq parameter value should be a non-negative number - the wave frequency (in Hz). If the value is zero, audio silence is generated. \nThe msec parameter value should be a number, it works in the way as it works for the PlayFile procedure. \nIf the freq2 parameter is specified, the generated tone is a combination of two sine waves, and the parameter value should be a positive number specifying the second wave frequency (in Hz). \nIf the ratio parameter is specified, its value should be a positive number in the 1..10000 range. It specifies the relative amplitude of the second wave, the first wave amplitude being 100. \nPlaying is suppressed or interrupted if the session ends, if the DTMF buffer is not empty (unless DTMF Interruption is disabled), or if there is an Event enqueued for this Task.';
            break;
        }
        case 219: {
            item.detail = '(PBXApp) GetPlayPosition()';
            item.documentation = 'This function returns a number - the portion of the media (in milliseconds) played by the last PlayFile or Play operation. \nIf the media was played in a loop, the length of the played portion in the last "loop" is returned: if a 3-second sound was played in loop, and it was interrupted after 7.2 seconds, the function returns 1200. \nIf the last Play* operation did not play its sound (because the DTMF buffer was not empty or there was an enqueued Event), the function returns either 0, or a negative value.';
            break;
        }
        case 220: {
            item.detail = '(PBXApp) SetPlayPosition(arg)';
            item.documentation = 'This procedure instructs the very next Play* operation to start playing its sound not from its beginning. \nThe arg value should be a non-negative number. It specifies how many milliseconds of the media should be skipped before the Play* operation starts to play the media.';
            break;
        }
        case 221: {
            item.detail = '(PBXApp) IsPlayCompleted()';
            item.documentation = 'This function returns a true-value if the media played by the last Play* operation was played in full. If media playing was interrupted, the function returns a null-value.';
            break;
        }
        case 222: {
            item.detail = '(PBXApp) Record(timeLimit)';
            item.documentation = 'This function records incoming audio data. The timeLimit value should be a positive number, it specifies the maximum recording time in seconds. \nRecording is suppressed or interrupted if the session ends, if the DTMF buffer is not empty, or if there is an Event enqueued for this Task. \nThe function returns a null-value if recording was suppressed, or a datablock with the recorded sound in the WAV format.';
            break;
        }
        case 223: {
            item.detail = '(PBXApp) SetLocalHold(flag)';
            item.documentation = 'This procedure sets the current call "on Hold" (if the flag is a true-value), or releases the call from hold (if the flag is a null-value). \nThis procedure can be used only when the Task is in the connected mode, and the Task peer media is not bridged.';
            break;
        }
        case 224: {
            item.detail = '(PBXApp) ReleaseMediaChannel()';
            item.documentation = 'This procedure releases the Task Media Channel (releasing the associated system resources). \nThis procedure can be used only when the Task is in the disconnected mode, or when the Task peer media is bridged.';
            break;
        }
        case 225: {
            item.detail = '(PBXApp) MediaOption(optionName) \nMediaOption(optionName,newValue)';
            item.documentation = 'This function return the current value of a Task Media Channel option. \nIf the newValue is specified and its value is not a null-value, then it is set as the new option value. \nThe optionName value should be a string and it specifies the option name. The following options are supported: \n"preplay" - this a numeric option, is specifies the amount of pre-recorded media (in milliseconds) sent to remote peers "ahead of time", to pre-fill the peer jitter buffers. \n"mixerDelay" - this a numeric option, it specifies the delay (in milliseconds) the Media Channel introduces before it reads Media Leg audio and mixes it with other Media Leg audio when a Media Channel has more than 2 active Media Legs ("conferencing"). The larger the delay, the better the Media Channel mixer processes irregular media streams coming from conference participants connected via sluggish networks. \n"inputSilenceLevel" - this a numeric option, it specifies the minimum level of the incoming audio. If the level is lower than the specified value, it is processed as a complete silence - it is not recorded and if there are more than 2 Media Legs ("conferencing"), this Media Leg incoming audio is not used mixed. \n"skipSilence" - this a numeric option, it specifies a time limit (in milliseconds). When the Media Channel is used to record the incoming media and the incoming audio level is lower than the "silence level" (see above), and this silence lasts longer than the specified time limit, recording is suspended. It resumes as soon as the incoming audio level increases above the "silence level". \n"mixMOH" - this a numeric option, it specifies if media from a peer sending MOH (Music-on-hold) should be processed or it should be ingnored. If the value is 1, the MOH media is processed, if the value is 0 (default), the MOH media is ignored. \nIf there are not more than two peers connected to the Media Channel, MOH media is always processed.';
            break;
        }
        case 226: {
            item.detail = '(PBXApp) StartBridge(taskRef)';
            item.documentation = 'This function sends a special StartBridge Event to the specified Task asking it to take over this Task peer media. \nThe taskRef value should be a task handle. It specifies the Task to send the request to. \nThis function returns a null-value if the specified Task successfully took over this Task peer media. Otherwise, the function returns an error code string. \nThe current Task should be in the incoming, provisioned, or connected mode. \nThe current Task is placed into the waiting state, and the target Task receives a special StartBridge Event.';
            break;
        }
        case 227: {
            item.detail = '(PBXApp) IsStartBridgeEvent(input)';
            item.documentation = 'This function returns a true-value if the input value is a StartBridge Event. Otherwise the function returns a null-value.';
            break;
        }
        case 228: {
            item.detail = '(PBXApp) RejectBridge(input,errorCode)';
            item.documentation = 'This function rejects the StartBridge request. \nThe input parameter value should be a StartBridge Event to reject. \nThe errorCode parameter value should be a string. \nThe StartBridge function in the Task that has sent this StartBridge Event exits the waiting state and it returns an error code string. \nThis function returns a null-value if the pending incoming call has been successfully rejected. Otherwise, the function returns an error code string.';
            break;
        }
        case 229: {
            item.detail = '(PBXApp) AcceptBridge(input)';
            item.documentation = 'This function builds a Media Bridge with the Task that has sent it the StartBridge Event. \nThe input value should be the StartBridge Event to accept. \nThis function returns a null-value if the Media Bridge has been successfully established. Otherwise, the function returns an error code string. \nThe StartBridge function in the Task that has sent this StartBridge Event exits the waiting state. That function returns a null-value if the Media Bridge is established, otherwise, it returns an error code string. If that Task was in the incoming or provisioned mode, the call in accepted, and the Task switches to the connected mode.';
            break;
        }
        case 230: {
            item.detail = '(PBXApp) BreakBridge()';
            item.documentation = 'This function removes the Media Bridge established with a successful completion of the StartBridge or AcceptBridge function. \nThe Task Media Channel is reconnected to the peer media. \nA special BreakBridge Event is sent to the "bridged" Task. \nThis function returns a null-value if the existing media bridge has been broken. Otherwise, the function returns an error code string.';
            break;
        }
        case 231: {
            item.detail = '(PBXApp) IsBreakBridgeEvent(input)';
            item.documentation = 'This function returns a true-value if the input value is a BreakBridge Event. Otherwise the function returns a null-value. \nWhen a Task receives a BreakBridge Event, it does not have to use the BreakBridge() procedure, as the Media Bridge has been already removed.';
            break;
        }
        case 232: {
            item.detail = '(PBXApp) AttachMixer(input)';
            item.documentation = 'The input value should be a StartBridge Event sent to this Task. \nThis function attaches the peer media of the sender Task to this Task Media Channel. \nThis function returns a null-value if the sender Task peer media is successfully attached to this Task Media Channel. Otherwise, the function returns an error code string. \nThe StartBridge function in the sender Task exits the waiting state. That StartBridge function returns a null-value if the sender Task peer media is attached successfully. Otherwise, that function returns an error code string. \nNote: If the AttachMixer function is used when the Task is in the disconnected mode, and the Task does not have a Media Channel, a new Media Channel is created for this Task.';
            break;
        }
        case 233: {
            item.detail = '(PBXApp) DetachMixer(taskRef)';
            item.documentation = 'This function detaches the peer media of the specified Task from this Task Media Channel. \nThe taskRef value should be a task handle. \nThe function returns a null-value if the peer media of the specified Task was attached to this Task Media Channel, and if that peer media is successfully reconnected back to the specified Task. \nThe specified Task receives a BreakBridge Event. \nThe function returns an error code string if the other Task peer media cannot be detached. \nThe taskRef value can be a null-value. In this case, all other Tasks peer media are detached from this Task Media Channel.';
            break;
        }
        case 234: {
            item.detail = '(PBXApp) MixerAttached()';
            item.documentation = 'This function returns an array of task handles for all Tasks that attached their peer media to this Task Media Channel. \nIf this Task Media Channel does not have any other Task peer media attached, this function returns a null-value.';
            break;
        }
        case 235: {
            item.detail = '(PBXApp) MuteMixer(taskRef,flag)';
            item.documentation = 'This procedure tells the Task Media Channel if it should ignore input from the specified Task. \nThe taskRef value should be a Task handle. This Task should have its peer media attached to the current Task Media Channel. \nThe taskRef value can be a null-value, in this case the current Task peer media is controlled. \nThe flag value specifies the operation: if the flag is a true-value, the peer media is ignored, if it is a null-value, the Media Channel starts to process media from the peer. \nIf the flag value is the "special" string, the peer media is not distributed to other "normal" peers. \nIf the flag value is the "hearsSpecial" string, the peer mute mode is not modified, but the media from the "special" peers is distributed to it. \nIf the flag value is the "hearsMute" string, the peer mute mode is not modified, but the media from all peers (muted, special, or unmuted) is distributed to it. \nIf the flag value is the "hearsNormal" string, the peer mute mode is not modified, but the media from the "special" peers is not distributed to it. \nWhen a Task has other Task peer media attached to its Media Channel, all media are placed into one conversation space (or a conference). \nThis Task cannot use the StartBridge or AcceptBridge functions.\n Note: in certain cases the system may decide to convert an AcceptBridge function operation into an AttachMixer function operation. As a result, the BreakBridge operation can be used by a Task that has exactly one other peer media attached to its Media Channel. \n If a Task disconnects its peer, or the Task peer disconnects itself, or a Task stops (normally, or because of an error), and there are other Task peer media attached to this Task Media Channel, the system automatically detaches all of them.';
            break;
        }
        case 236: {
            item.detail = '(PBXApp) StartBridgedCall(destination,event)';
            item.documentation = 'This function works as the StartCall function, but the event value should be StartBridge Event sent to this Task by an ingress Task. The Task initiates a call using the media descriptor from the Event data (describing the ingress Task peer media). \nProvisional responses are delivered as Events to the current Task, and they are sent to the ingress Task (see below). \nIf the call is successful, a Media Bridge between the Tasks is built,the current Task receives a final response Event, and the StartBridge operation in the ingress Task completes successfully. \nIf the call fails, the current Task receives a final response Event, but no Event is sent to the ingress Task. The current Task can either try a new StartBridgedCall operation, or it can use AcceptBridge/AttachMixer/RejectBridge operations to process the received StartBridge Event. \nIf the ingress Task quits, or if that Task had a pending incoming call and that call was canceled, the initiated outgoing call is canceled, and the current Task receives the BreakBridge event.';
            break;
        }
        case 237: {
            item.detail = '(PBXApp) TransferSupported()';
            item.documentation = 'This function returns a true-value if the peer supports Transfer operations, otherwise the function returns a null-value.';
            break;
        }
        case 238: {
            item.detail = '(PBXApp) IsCallTransferredEvent(input)';
            item.documentation = 'This function returns a true-value if the input value is a CallTransferred Event (this event can be sent when an external request has switched this Task to a different peer). Otherwise the function returns a null-value.';
            break;
        }
        case 239: {
            item.detail = '(PBXApp) TransferCall(destination)';
            item.documentation = 'This function attempts a "blind transfer" of the Task peer. The Task should be in the connected mode. \nThe destination value should be a string containing the URI or an E-mail address to transfer the call to. \nIf the call transfer fails, the function returns an error code string. \nIf the call transfer succeeds, the function returns a null-value. \nWhen the operation is completed, the Task stays in the connected mode, unless the peer has disconnected explicitly (by sending the BYE request).';
            break;
        }
        case 240: {
            item.detail = '(PBXApp) StartTransfer(taskRef)';
            item.documentation = 'This function sends a special StartTransfer Event to the specified Task asking it to connect Task peers directly. \nThe taskRef value should be a task handle. It specifies the Task to send the request to. \nThis function returns a null-value if the specified Task successfully connected the peers. Otherwise, the function returns an error code string. \nThe current Task should be in the connected mode. \nThe current Task is placed into the waiting state, and the target Task receives a special StartTransfer Event.';
            break;
        }
        case 241: {
            item.detail = '(PBXApp) IsStartTransferEvent(input)';
            item.documentation = 'This function returns a true-value if the input value is a StartTransfer Event. \nOtherwise the function returns a null-value.';
            break;
        }
        case 242: {
            item.detail = '(PBXApp) RejectTransfer(input,errorCode)';
            item.documentation = 'This function rejects the StartTransfer request. \nThe input parameter value should be a StartTransfer Event to reject. \nThe errorCode parameter value should be a string. \nThe StartTransfer function in the Task that has sent this StartTransfer Event exits the waiting state and it returns an error code string.';
            break;
        }
        case 243: {
            item.detail = '(PBXApp) AcceptTransfer(input)';
            item.documentation = 'This function connects the current Task peer with the peer of the Task that has sent it the StartTransfer Event. \nThe input value should be the StartTransfer Event to accept. \nThis function returns a null-value if the peers have been successfully connected. Otherwise, the function returns an error code string. \nThe StartTransfer function in the Task that has sent this StartTransfer Event exits the waiting state. That function returns a null-value if the peers have been connected, otherwise, it returns an error code string. \nIf the peers have been connected, both Tasks stay in the connected mode, unless their peers explicitly send the disconnect Signals. The Tasks should either quit or they should use the Disconnect procedure to fully disconnect from their peers. \nApplications can receive and send INFO requests. \nCertain INFO requests (such as DTMF event requests) are processed automatically and this section does not apply to them. \nINFO request data is presented as a dictionary, with the following elements: \nContent-Type - This optional string element contains the request body Content-Type (such as application). \nContent-Subtype - This optional string element contains the request body Content-Type subtype. \n"" (empty key) - This optional string or datablock or XML element contains the request body content.';
            break;
        }
        case 244: {
            item.detail = '(PBXApp) SendCallInfo(params)';
            item.documentation = 'This function sends an INFO request to the Task peer. The Task should be in the connected mode. \nThe params value should be a dictionary containing the INFO request data. \nIf the operation fails, the function returns an error code string. \nIf the operation succeeds, the function returns a null-value.\nWhen an INFO request is sent to a Task, the Task receives a special CallInfo Event. The Event parameter element contains a dictionary - the INFO request data.';
            break;
        }
        case 245: {
            item.detail = '(PBXApp) IsCallInfoEvent(input)';
            item.documentation = 'This function returns a true-value if the input value is a CallInfo Event. Otherwise the function returns a null-value.';
            break;
        }
        case 246: {
            item.detail = '(PBXApp) SendCallOptions(params)';
            item.documentation = 'This function sends an OPTION request to the Task peer (if the dialog has been established and the Task is in the connected mode), or to an arbitrary entity (if the Task is in the disconnected mode). \nThe params value is interpreted in the same way as the StartCall destination parameter value. \nIf the operation fails, the function returns an error code string. \nIf the operation succeeds, the function returns a null-value.';
            break;
        }
        case 247: {
            item.detail = '(PBXApp) SignalOption(optionName) \nSignalOption(optionName,newValue)';
            item.documentation = 'This function return the current value of a Task Signal option. \nIf the newValue value is specified and its value is not a null-value, then it is set as the new option value. \nThe optionName value should be a string and it specifies the option name. The following options are supported: \n"refer" - this option specifies how the Task processes the REFER requests and INVITE/replaces requests. The supported values are: \n"self" - outgoing signals are authenticated as coming from the current Account; this is the default value \n"peer" - outgoing signals are authenticated as coming from the Task peer (i.e. the sender of the REFER signal) \n"disabled" - REFER and INVITE/replaces request processing is prohibited. \n"transferReport" - this option specifies if call transfers are to be reported. The supported values are: \n"NO" - no event is sent when a Task is transferred to a different peer; this is the default value true-value ( "YES") the Task receives a special CallTransferred Event when it is transferred to a different peer. \n"bridgeBreak" - this option specifies how the Task reacts when a media bridge is broken by the other task. The supported values are: \n"disconnect" - the Task disconnects its current peer, and the Task enters the disconnected mode. \n"keep" - if the Task does not have a Media channel, it is created. Then the Task peer is switched to that channel. \n"default" - if the Task does not have a Media channel, the Task disconnects its current peer. Otherwise, the Task peer is switched to that channel. This is the default value. \n"bridgedProvisionRelay" - this option specifies how the provisional responses generated with the StartBridgedCall function are delivered to the peer. The supported values are: true-value ( "YES") provisional responses are relayed to this Task peer, using the ProvisionCall function with the reliably parameter set to a null-value; this is the default value \n"reliably" - provisional responses are relayed to this Task peer, using the ProvisionCall function with the reliably parameter set to a true-value \n"NO" - provisional responses are not relayed to this Task peer \n"bridgedProvisionToTags" - this option specifies how the provisional responses generated with the StartBridgedCall function are delivered to the peer. The supported values are: \n"NO" - all provisional responses contain the same To-tag, assigned to this Task; this is the default value. \ntrue-value ( "YES") - the provisional responses keep their original To-tags. \n"bridgedProvisionQueue" - this option specifies the provisioning response FIFO queue size. This queue is used when provisioning responses from the other task are received faster that they can be delivered to this Task peer. The default queue length is 10. \n"callInfo" - this is a read-only option; if specified, the newValue must be a null-value. \nThe function returns information about the system "call" object: time connected, proxies used, etc.';
            break;
        }
        case 248: {
            item.detail = '(PBXApp) SendCallNotify(params)';
            item.documentation = 'This function sends a NOTIFY request to an arbitrary entity (the Task must be in the disconnected mode). \nThe params value must be a dictionary containing the following string elements: \n"" (empty string), From, To, Call-ID - these elements are processed in the same way as the StartCall destination parameter elements. \nEvent - the event name string \n@Event-Params - an optional dictionary with the parametes to put into the request Event field. \nSubscription-State - an optional string to put into the request Subscription-State field. \n@Content - an optional string or a datablock to send as the request body. \nContent-Type, Content-Subtype - optional strings for the request Content-Type field. \nIf the operation fails, the function returns an error code string. \nIf the operation succeeds, the function returns a null-value.';
            break;
        }
        case 249: {
            item.detail = '(PBXApp) IsInstantMessageEvent(input)';
            item.documentation = 'This function returns a true-value if the input value is an Instant Message Event. Otherwise the function returns a null-value. \nThe event parameter is a dictionary. It contains the same elements as the SendInstantMessage function content parameter, with the following additional elements: \nFrom - a string - the sender E-Mail address. \npeerName - an optional string - the sender "real name". \nfromInstance - an optional string - the sender "instance". \nTo - a string - the original recipient E-Mail address. \ntoInstance - an optional string - the recipient "instance". \nauthName - an optional string - the authenticated identity of the sender. \nredirector - an optional string - the authenticated identity of the message redirector (the Account that redirected this message using its Automated Rules or other means).';
            break;
        }
        case 250: {
            item.detail = '(PBXApp) IsXMPPIQEvent(input)';
            item.documentation = 'This function returns a true-value if the input value is an XMPP IQ/presence Event. Otherwise the function returns a null-value. \nThe event parameter is a dictionary. It contains the same elements as the SendXMPPIQ function content parameter, with the following additional elements: From, peerName, fromInstance, To, toInstance, authName, redirector, which have the same meanings as in Instant Message Events.';
            break;
        }
        case 251: {
            item.detail = '(WebApp) GetHTTPParameter(name [ ,index ])';
            item.documentation = 'This function retrieves an HTTP request parameter. HTTP request parameters include URL parameters and/or form fields. \nThe name value should be a string specifying the HTTP request parameter name. \nAn HTTP request can contain several parameters with the same name. If the index parameter is present, its value should be a number specifying which HTTP request parameter of the specified name should be retrieved. \nIf the HTTP request contains the FormCharset parameter, its value is interpreted as the character set name. The function converts the raw parameter data into the UTF-8 character set. If the FormCharset parameter is absent, the raw parameter data is assumed to be encoded using the UTF-8 character set. \nIf the parameter value contains several lines, the EOL (line separator) symbols are converted to those used with the Server host OS. \nThis function returns a string containing the parameter value. If the parameter with the specified name and, optionally, index is not found, this function returns a null-value.';
            break;
        }
        case 252: {
            item.detail = '(WebApp) GetHTTPBinaryParameter(name [ ,index ])';
            item.documentation = 'This function retrieves an HTTP request parameter raw data. \nThis function returns a datablock containing the parameter value. If the parameter with the specified name and, optionally, index is not found, this function returns a null-value.';
            break;
        }
        case 253: {
            item.detail = '(WebApp) GetHTTPField(name)';
            item.documentation = 'This function retrieves the name HTTP request field. \nThe following fields are supported: Authorization, Referer, Destination, Cookie, User-Agent, Host. \nIf the name value is an empty string, the HTTP request URL (without the optional URL parameters) is returned. \nIf the name value is the Schema string, the request URL schema used (the http or https string) is returned. \nIf the name value is the Host string, the request Host field is returned, with the optional "port" part removed. \nIf the name value is the Port string, the port number from the Host field is returned; if no port is specified in that field, the number 80 is returned for clear text connections, and the number 443 for secure connections. \nIf the specified field name if not in the supported set, or if the request does not contain the specified field, this function returns a null-value.';
            break;
        }
        case 254: {
            item.detail = '(WebApp) GetHTTPQuery()';
            item.documentation = 'This function retrieves the parameter string from the HTTP request URL. \nIf the request URL does not contain parameters, the function return a null-value.';
            break;
        }
        case 255: {
            item.detail = '(WebApp) GetHTTPResource()';
            item.documentation = 'This function retrieves the HTTP request query string, including all URL parameters.';
            break;
        }
        case 256: {
            item.detail = '(WebApp) GetHTTPMethod()';
            item.documentation = 'This function retrieves the HTTP request method string (GET, POST, etc.).';
            break;
        }
        case 257: {
            item.detail = '(WebApp) GetHTTPType()';
            item.documentation = 'This function retrieves the HTTP request body Content type.';
            break;
        }
        case 258: {
            item.detail = '(WebApp) GetHTTPSubtype()';
            item.documentation = 'This function retrieves the HTTP request body Content subtype.';
            break;
        }
        case 259: {
            item.detail = '(WebApp) GetHTTPData()';
            item.documentation = 'This function retrieves the HTTP request body. \nIf the request body content subtype is xml or it ends with +xml, the function tries to convert the body content into XML and returns an XML object. \nIf the request body content type is text, the function converts the body content into UTF-8 and returns a string. \nOtherwise, the function returns a datablock. \nIf any conversion operation fails, or if the request body is absent or it is too long, the function return a null-value.';
            break;
        }
        case 260: {
            item.detail = '(WebApp) SetHTTPResponseData(data)';
            item.documentation = 'This procedure sets the HTTP response body. \nThe data value should be either a string, a datablock, a dictionary or an XML object.';
            break;
        }
        case 261: {
            item.detail = '(WebApp) SetHTTPResponseType(mimeType,subtype)';
            item.documentation = 'This procedure sets the HTTP response Content-Type field values. \nThe mimeType and subtype values should be strings containing valid MIME atoms.';
            break;
        }
        case 262: {
            item.detail = '(WebApp) SetHTTPResponseCode(code)';
            item.documentation = 'This procedure sets the HTTP response code. \nThe code value should be a number in the 200..999 range or a string. \nIf the string starts with a 3-digit prefix and the - symbol, then the prefix specifies the HTTP response code, and the rest of the string specifies the HTTP response text. \nIf there is no such prefix in the code string value, then the HTTP response code is set to 500, and the entire string is used as the HTTP response text.';
            break;
        }
        case 263: {
            item.detail = '(WebApp) RemoteIPAddress()';
            item.documentation = 'This function returns an ip-address object specifying the IP Address the HTTP request was received from.';
            break;
        }
        case 264: {
            item.detail = '(WebApp) ProxiedIPAddress()';
            item.documentation = 'If the HTTP request was relayed by some external HTTP proxy, this function returns the original client IP Address. Otherwise the function returns a null-object.';
            break;
        }
        case 265: {
            item.detail = '(WebApp) SendHTTPContinue()';
            item.documentation = 'This function sends the 100-Continue HTTP response. \nIf the response is successfully sent, the function returns a null-value, otherwise it returns an error code string.';
            break;
        }
        case 266: {
            item.detail = '(WebApp) AddHTTPResponseField(fieldName,fieldValue)';
            item.documentation = 'This procedure adds a field to the HTTP response. \nThe fieldName and fieldValue values should be strings.';
            break;
        }
        case 267: {
            item.detail = '(WebApp) ProcessWSSP(pageName,resultSet)';
            item.documentation = 'This procedure composes the HTTP response body using the specified WSSP page and the result dataset. \nThe pageName value should be a string with the page name (without the wssp suffix). This page is retrieved from the currently selected Skin. \nThe resultSet value should be a dictionary. The Server modifies this dictionary adding the common Session or stateless processing elements (see above), and then it is passed to the WSSP interpreter. \nThe resulting page is set as the HTTP response body.';
            break;
        }
        case 268: {
            item.detail = '(WebApp) SessionData()';
            item.documentation = 'This function returns the Session Dataset dictionary.';
            break;
        }
        case 269: {
            item.detail = '(CLI/API) LISTDOMAINS';
            item.documentation = 'Use this command to get the list of domains. The command produces output data - an array with the names of all server domains.';
            break;
        }
        case 270: {
            item.detail = '(CLI/API) MAINDOMAINNAME';
            item.documentation = 'Use this command to get the name of the Main Domain. The command produces output data - a string with the Main Domain name.';
            break;
        }
        case 271: {
            item.detail = '(CLI/API) GETDOMAINDEFAULTS';
            item.documentation = 'Use this command to get the server-wide default Domain Settings. The command produces an output - a dictionary with the default Domain Settings.';
            break;
        }
        case 272: {
            item.detail = '(CLI/API) UPDATEDOMAINDEFAULTS newSettings';
            item.documentation = 'Use this command to change the server-wide default Domain settings.\nnewSettings : dictionary\nThis dictionary is used to update the default Domain settings dictionary. It does not have to contain all settings data, the omitted settings will be left unmodified.';
            break;
        }
        case 273: {
            item.detail = '(CLI/API) SETDOMAINDEFAULTS newSettings';
            item.documentation = 'Use this command to change the server-wide default Domain settings.\nnewSettings : dictionary\nThis dictionary is used to replace the server-wide default Domain settings dictionary.';
            break;
        }
        case 274: {
            item.detail = '(CLI/API) GETCLUSTERDOMAINDEFAULTS';
            item.documentation = 'This command is available in the Dynamic Cluster only. Use this command instead of the GETDOMAINDEFAULTS command to work with the cluster-wide default Domain Settings.';
            break;
        }
        case 275: {
            item.detail = '(CLI/API) UPDATECLUSTERDOMAINDEFAULTS newSettings';
            item.documentation = 'This command is available in the Dynamic Cluster only. Use this commands instead of the UPDATEDOMAINDEFAULTS command to work with the cluster-wide default Domain Settings.';
            break;
        }
        case 276: {
            item.detail = '(CLI/API) SETCLUSTERDOMAINDEFAULTS newSettings';
            item.documentation = 'These command is available in the Dynamic Cluster only. Use this command instead of the SETDOMAINDEFAULTS command to work with the cluster-wide default Domain Settings.';
            break;
        }
        case 277: {
            item.detail = '(CLI/API) GETSERVERACCOUNTDEFAULTS';
            item.documentation = 'Use this command to get the server-wide Default Account settings. The command produces an output - a dictionary with the global default Account settings.';
            break;
        }
        case 278: {
            item.detail = '(CLI/API) UPDATESERVERACCOUNTDEFAULTS newSettings';
            item.documentation = 'Use this command to update the server-wide Default Account settings.\nnewSettings : dictionary\nThis dictionary is used to update the Default Account settings dictionary. It does not have to contain all settings data, the omitted settings will be left unmodified.';
            break;
        }
        case 279: {
            item.detail = '(CLI/API) SETSERVERACCOUNTDEFAULTS newSettings';
            item.documentation = 'Use this command to set the server-wide Default Account settings.\nnewSettings : dictionary\nThis dictionary is used to replace the server-wide Default Account settings dictionary.';
            break;
        }
        case 280: {
            item.detail = '(CLI/API) GETCLUSTERACCOUNTDEFAULTS';
            item.documentation = 'This command is available in the Dynamic Cluster only. Use this command instead of the GETSERVERACCOUNTDEFAULTS commands to work with the cluster-wide Default Account settings.';
            break;
        }
        case 281: {
            item.detail = '(CLI/API) UPDATECLUSTERACCOUNTDEFAULTS newSettings';
            item.documentation = 'This command is available in the Dynamic Cluster only. Use this command instead of the UPDATESERVERACCOUNTDEFAULTS commands to work with the cluster-wide Default Account settings.';
            break;
        }
        case 282: {
            item.detail = '(CLI/API) SETCLUSTERACCOUNTDEFAULTS newSettings';
            item.documentation = 'This command is available in the Dynamic Cluster only. Use this command instead of the SETSERVERACCOUNTDEFAULTS commands to work with the cluster-wide Default Account settings.';
            break;
        }
        case 283: {
            item.detail = '(CLI/API) GETSERVERACCOUNTPREFS';
            item.documentation = 'Use this command to get the server-wide Default Account Preferences. The command produces an output - a dictionary with the default Preferences.';
            break;
        }
        case 284: {
            item.detail = '(CLI/API) SETSERVERACCOUNTPREFS newSettings';
            item.documentation = 'Use this command to change the server-wide Default Account Preferences. newSettings : dictionar his dictionary is used to replace the server-wide Default Account Preferences. All old server-wide Default Account Preferences are removed.';
            break;
        }
        case 285: {
            item.detail = '(CLI/API) UPDATESERVERACCOUNTPREFS newSettings';
            item.documentation = 'Use this command to change the server-wide Default Account Preferences. newSettings : dictionar his dictionary is used to update the Default Account Preferences. It does not have to contain all preferences data, the omitted Preferences will be left unmodified.';
            break;
        }
        case 286: {
            item.detail = '(CLI/API) GETCLUSTERACCOUNTPREFS';
            item.documentation = 'This command is available in the Dynamic Cluster only. Use this command instead of the GETSERVERACCOUNTPREFS command to work with the cluster-wide Default Account Preferences.';
            break;
        }
        case 287: {
            item.detail = '(CLI/API) SETCLUSTERACCOUNTPREFS newSettings';
            item.documentation = 'This command is available in the Dynamic Cluster only. Use this command instead of the SETSERVERACCOUNTPREFS command to work with the cluster-wide Default Account Preferences.';
            break;
        }
        case 288: {
            item.detail = '(CLI/API) UPDATECLUSTERACCOUNTPREFS newSettings';
            item.documentation = 'This command is available in the Dynamic Cluster only. Use this command instead of the UPDATESERVERACCOUNTPREFS command to work with the cluster-wide Default Account Preferences.';
            break;
        }
        case 289: {
            item.detail = '(CLI/API) CREATEDOMAIN domainName [ SHARED ] [ PATH storage ] [ settings ]';
            item.documentation = 'Use this command to create a new secondary Domain.\ndomainName : string\nThis parameter specifies the Domain name to create.\nstorage : string\nThis optional parameter specifies the "storage mount Point" directory for the Domain data (the name should be specified without the .mnt suffix).\nsettings : dictionary\nThis optional parameter specifies the Domain settings. Use the SHARED keyword to create a Cluster-wide Domain in a Dynamic Cluster.';
            break;
        }
        case 290: {
            item.detail = '(CLI/API) RENAMEDOMAIN oldDomainName INTO newDomainName [ PATH storage ]';
            item.documentation = 'Use this command to rename a Domain.\noldDomainName : string\nThis parameter specifies the name of an existing secondary Domain.\nnewDomainName : string\nThis parameter specifies the new Domain name.\nstorage : string\nThis optional parameter specifies the new "storage mount Point" directory for the Domain data (the name should be specified without the .mnt suffix).';
            break;
        }
        case 291: {
            item.detail = '(CLI/API) DELETEDOMAIN domainName [ FORCE ]';
            item.documentation = 'Use this command to remove a Domain.\ndomainName : string\nThis parameter specifies the name of the Domain to be removed.\nFORCE\nThis optional parameter specifies that the Domain should be removed even if it is not empty. All Domain objects (Accounts, Groups, etc.) will be removed.';
            break;
        }
        case 292: {
            item.detail = '(CLI/API) CREATEDIRECTORYDOMAIN domainName [ settings ]';
            item.documentation = 'Use this command to create a new directory-based Domain.\ndomainName : string\nThis parameter specifies the Domain name to create.\nsettings : dictionary\nThis optional parameter specifies the Domain settings. This operation is allowed only when the Directory-based Domains are enabled.';
            break;
        }
        case 293: {
            item.detail = '(CLI/API) RELOADDIRECTORYDOMAINS';
            item.documentation = 'Use this command to tell the server to scan the Domains Directory subtree so it can find all additional Directory-based Domains created directly in the Directory, bypassing the CommuniGate Pro Server. This operation is allowed only when the Directory-based Domains are enabled.';
            break;
        }
        case 294: {
            item.detail = '(CLI/API) LISTSERVERTELNUMS [ FILTER filter ] limit';
            item.documentation = 'Use this command to read Telnum numbers created in all (non-clustered) Domains. The command produces an output - a dictionary where each key is a Telnum number, and its value is the Account name it is assigned to. An numeric element for an empty ("") key is added, it contains the total number of Telnum numbers created. filter : string\nIf this optional parameter is specified, only the telnum numbers containing the specified string are returned.\nlimit : number\nThe maximum number of Telnum numbers to return.';
            break;
        }
        case 295: {
            item.detail = '(CLI/API) LISTCLUSTERTELNUMS [ FILTER filter ] limit';
            item.documentation = 'The same as LISTSERVERTELNUMS, but for shared Cluster Domains.';
            break;
        }
        case 296: {
            item.detail = '(CLI/API) GETSERVERTRUSTEDCERTS';
            item.documentation = 'Use this command to get the server-wide set of Trusted Certificates. The command produces an output - an array of datablocks. Each datablock contains one X.509 certificate data.';
            break;
        }
        case 297: {
            item.detail = '(CLI/API) SETSERVERTRUSTEDCERTS newCertificates';
            item.documentation = 'Use this command to set the server-wide set of Trusted Certificates.\nnewCertificates : array\nThis array should contain datablocks with X.509 certificate data. It is used to replace the server-wide list of Trusted Certificates.';
            break;
        }
        case 298: {
            item.detail = '(CLI/API) GETCLUSTERTRUSTEDCERTS';
            item.documentation = 'This command is available in the Dynamic Cluster only. Use this command instead of the GETSERVERTRUSTEDCERTS command to work with the cluster-wide set of Trusted Certificates.';
            break;
        }
        case 299: {
            item.detail = '(CLI/API) SETCLUSTERTRUSTEDCERTS newCertificates';
            item.documentation = 'This command is available in the Dynamic Cluster only. Use this command instead of the SETSERVERTRUSTEDCERTS command to work with the cluster-wide set of Trusted Certificates.';
            break;
        }
        case 300: {
            item.detail = '(CLI/API) GETDIRECTORYINTEGRATION';
            item.documentation = 'Use this command to get the server-wide Directory Integration settings. The command produces an output - a dictionary with the Directory Integration settings.';
            break;
        }
        case 301: {
            item.detail = '(CLI/API) SETDIRECTORYINTEGRATION newSettings';
            item.documentation = 'Use this command to set the server-wide Directory Integration settings.\nnewSettings : dictionary\nThis dictionary is used to replace the server-wide Directory Integration settings dictionary.';
            break;
        }
        case 302: {
            item.detail = '(CLI/API) GETCLUSTERDIRECTORYINTEGRATION';
            item.documentation = 'This command is available in the Dynamic Cluster only. Use this command instead of the GETDIRECTORYINTEGRATION command to work with the cluster-wide Directory Integration settings.';
            break;
        }
        case 303: {
            item.detail = '(CLI/API) SETCLUSTERDIRECTORYINTEGRATION newSettings';
            item.documentation = 'This command is available in the Dynamic Cluster only. Use this command instead of the SETDIRECTORYINTEGRATION command to work with the cluster-wide Directory Integration settings.';
            break;
        }
        case 304: {
            item.detail = '(CLI/API) CREATEDOMAINSTORAGE [ SHARED ] PATH storage';
            item.documentation = 'Use this command to create a "storage mount point" for new Domains.\nstorage : string\nThis parameter specifies the "storage mount Point" name. Use the SHARED keyword to create a "storage mount point" for Cluster Domains in a Dynamic Cluster.';
            break;
        }
        case 305: {
            item.detail = '(CLI/API) LISTDOMAINSTORAGE [ SHARED ]';
            item.documentation = 'Use this command to list "storage mount points" for Domains. \nThe command produces an output - an array with "storage mount points" names. \nUse the SHARED keyword to list "storage mount point" for Cluster Domains in a Dynamic Cluster.';
            break;
        }
        case 306: {
            item.detail = '(CLI/API) GETDOMAINSETTINGS [ domainName ]';
            item.documentation = 'Use this command to get the Domain settings. The command produces an output - a dictionary with the domainName settings. Only the explicitly set (not the default) settings are included into that dictionary.\ndomainName : string \nThis optional parameter specifies the name of an existing Domain.';
            break;
        }
        case 307: {
            item.detail = '(CLI/API) GETDOMAINEFFECTIVESETTINGS [ domainName ]';
            item.documentation = 'Use this command to get the Domain settings. The command produces an output - a dictionary with the domainName settings. Both the explicitly set and the default settings are included into that dictionary. domainName : string \nThis optional parameter specifies the name of an existing Domain.';
            break;
        }
        case 308: {
            item.detail = '(CLI/API) UPDATEDOMAINSETTINGS [ domainName ] newSettings';
            item.documentation = 'Use this command to update the Domain settings.\ndomainName : string \nThis optional parameter specifies the name of an existing Domain.\nnewSettings : dictionary\nThis dictionary is used to update the Domain settings dictionary. It does not have to contain all settings data, the omitted settings will be left unmodified. If a new setting value is specified as the string default, the Domain setting value is removed, so the default Domain settings value will be used. If this command is used by a Domain Administrator, it will update only those Domain Settings that this Domain Administrator is allowed to modify.';
            break;
        }
        case 309: {
            item.detail = '(CLI/API) GETACCOUNTDEFAULTS [ domainName ]';
            item.documentation = 'Use this command to get the default Account settings for the specified Domain. The command produces an output - a dictionary with the default settings.\ndomainName : string \nThis optional parameter specifies the Domain name. If the Domain name is not specified, the command applies to the Administrator Domain.';
            break;
        }
        case 310: {
            item.detail = '(CLI/API) UPDATEACCOUNTDEFAULTS [ domainName ] newSettings';
            item.documentation = 'Use this command to modify the Default Account settings for the specified Domain.\ndomainName : string\nThis optional parameter specifies the Domain name. If the Domain name is not specified, the command applies to the administrator Domain.\nnewSettings : dictionary\nThis dictionary is used to modify the Domain Default Account settings. The dictionary does not have to contain all settings data, the omitted settings will be left unmodified. If a new setting value is specified as the string default, the setting value is removed, so the global Server Default Account Settings will be used. If this command is used by a Domain Administrator, it will update only those Default Account settings this Administrator is allowed to modify.';
            break;
        }
        case 311: {
            item.detail = '(CLI/API) GETACCOUNTDEFAULTPREFS [ domainName ]';
            item.documentation = 'Use this command to get the Default Account Preferences for the specified Domain. The command produces an output - a dictionary with the default Preferences. domainName : string\nThis optional parameter specifies the Domain name. If the Domain name is not specified, the command applies to the administrator Domain.';
            break;
        }
        case 312: {
            item.detail = '(CLI/API) SETACCOUNTDEFAULTPREFS [ domainName ] newSettings';
            item.documentation = 'Use this command to change the Default Account Preferences for the specified Domain. domainName : string\nThis optional parameter specifies the Domain name. If the Domain name is not specified, the command applies to the authenticated user Domain.\nnewSettings : dictionary\nThis dictionary is used to replace the Default Account Preferences. All old Default Account Preferences are removed. This command can be used by Domain Administrators only if they have the WebUserSettings access right.';
            break;
        }
        case 313: {
            item.detail = '(CLI/API) UPDATEACCOUNTDEFAULTPREFS [ domainName ] newSettings';
            item.documentation = 'Use this command to change the Default Account Preferences for the specified Domain. domainName : string\nThis optional parameter specifies the Domain name. If the Domain name is not specified, the command applies to the authenticated user Domain.\nnewSettings : dictionary\nThis dictionary is used to modify the Domain Default Account Preferences. It does not have to contain all Preferences data, the omitted elements will be left unmodified. If a new element value is specified as the string default, the Default Preferences value is removed, so the default Server-wide (or Cluster-wide) Account Preferences value will be used. This command can be used by Domain Administrators only if they have the WebUserSettings access right.';
            break;
        }
        case 314: {
            item.detail = '(CLI/API) GETACCOUNTTEMPLATE [ domainName ]';
            item.documentation = 'Use this command to get the Account Template settings. The command produces an output - a dictionary with the Template settings.\ndomainName : string\nThis optional parameter specifies the Domain name. If the Domain name is not specified, the command applies to the administrator Domain.';
            break;
        }
        case 315: {
            item.detail = '(CLI/API) UPDATEACCOUNTTEMPLATE [ domainName ] newSettings';
            item.documentation = 'Use this command to modify the Account Template settings.\ndomainName : string\nThis optional parameter specifies the Domain name. If the Domain name is not specified, the command applies to the administrator Domain.\nnewSettings : dictionary\nThis dictionary is used to modify the Domain Account Template. All new Accounts in the specified Domain will be created with the Template settings. The dictionary does not have to contain all settings data, the omitted settings will be left unmodified. If a new setting value is specified as the string default, the Template setting value is removed. If this command is used by a Domain administrator, it will update only those Template settings that the Domain administrator is allowed to modify.';
            break;
        }
        case 316: {
            item.detail = '(CLI/API) GETDOMAINALIASES domainName';
            item.documentation = 'Use this command to get the list of Domain Aliases. The command produces an output - an array with the Domain alias names. domainName : string\nThis parameter specifies the name of an existing Domain.';
            break;
        }
        case 317: {
            item.detail = '(CLI/API) GETDOMAINMAILRULES domainName';
            item.documentation = 'Use this command to get the list of Domain Queue Rules. The command produces an output - an array of the Queue Rules specified for the Domain.\ndomainName : string\nThis parameter specifies the name of an existing Domain.';
            break;
        }
        case 318: {
            item.detail = '(CLI/API) SETDOMAINMAILRULES domainName newRules';
            item.documentation = 'Use this command to set the Domain Queue Rules.\ndomainName : string\nThis parameter specifies the name of an existing Domain.\nnewRules : array\nThis array should contain the Domain Queue Rules. All old Domain Queue Rules are removed. This command can be used by Domain Administrators only if they have the RulesAllowed access right.';
            break;
        }
        case 319: {
            item.detail = '(CLI/API) GETDOMAINSIGNALRULES domainName';
            item.documentation = 'Use this command to get the list of Domain Signal Rules. The command produces an output - an array of the Signal Rules specified for the Domain.\ndomainName : string\nThis parameter specifies the name of an existing Domain.';
            break;
        }
        case 320: {
            item.detail = '(CLI/API) SETDOMAINSIGNALRULES domainName newRules';
            item.documentation = 'Use this command to set the Domain Signal Rules.\ndomainName : string\nThis parameter specifies the name of an existing Domain.\nnewRules : array\nThis array should contain the Domain Signal Rules. All old Domain Signal Rules are removed. This command can be used by Domain Administrators only if they have the SignalRulesAllowed access right.';
            break;
        }
        case 321: {
            item.detail = '(CLI/API) LISTADMINDOMAINS [ domainName ]';
            item.documentation = 'Use this command to get the list of Domains that can be administered by Domain Administrator Accounts in the specified domainName Domain. The command produces an output - an array with the Domain names.\ndomainName : string\nThis optional parameter specifies the Domain name. If the Domain name is not specified, the command applies to the authenticated user Domain.';
            break;
        }
        case 322: {
            item.detail = '(CLI/API) LISTDOMAINOBJECTS domainName [ FILTER filter ] limit [ ACCOUNTS ] [ ALIASES ] [ FORWARDERS ] [ COOKIE cookie ]';
            item.documentation = 'Use this command to get a list of Domain objects.\ndomainName : string\nThis parameter specifies the Domain name.\nfilter : string\nThis optional parameter specifies a filter string: only objects with names including this string as a substring are listed.\nlimit : numeric string\nThis parameter specifies the maximum number of objects to list.\nACCOUNTS, ALIASES, FORWARDERS\nThese keywords specify which Domain objects should be listed.\ncookie : string\nThis optional parameter specifies a "cookie" string. \nThe command produces output data - an array with the following elements: \na numeric string with the total number of Domain Accounts \na dictionary with Domain Objects. Each dictionary key is a Domain Object name. The dictionary value depends on the Domain Object type: \nAccount - the dictionary object is a string (the Account file extension) \nAccount Alias - the dictionary object is an array. Its only element is a string with the Alias owner (Account) name. \nForwarder - the dictionary object is an array. Its only element is an array. Its only element is a string with the Forwarder address. \na numeric string with the total number of Aliases in the Domain. \na numeric string with the total number of Forwarders in the Domain. \na new "cookie" string (optional, exists only if there was the COOKIE cookie part in the command.) \nTo list Objects in large Domains, specify some reasonable limit value (below 10,000) and specify and empty cookie string. If not all Objects are returned, issue the command again, using the new cookie value specified in the response array. When all Objects are returned, the new cookie value in the response is an empty string.';
            break;
        }
        case 323: {
            item.detail = '(CLI/API) LISTACCOUNTS [ domainName ]';
            item.documentation = 'Use this command to get the list of all Accounts in the Domain. The command produces output data - a dictionary with the keys listing all Accounts in the specified (or default) Domain.\ndomainName : string\nThis optional parameter specifies the Domain name. If the Domain name is not specified, the command applies to the administrator Domain.';
            break;
        }
        case 324: {
            item.detail = '(CLI/API) LISTDOMAINTELNUMS domainName [ FILTER filter ] limit';
            item.documentation = 'Use this command to read Telnum numbers created in the specified Domain. The command produces an output - a dictionary where each key is a Telnum number, and its value is the Account name it is assigned to. An numeric element for an empty ("") key is added, it contains the total number of Telnum numbers created. \ndomainName : string\nThis parameter specifies the Domain name.\nfilter : string\nIf this optional parameter is specified, only the telnum numbers containing the specified string are returned.\nlimit : number\nThe maximum number of Telnum numbers to return.';
            break;
        }
        case 325: {
            item.detail = '(CLI/API) INSERTDIRECTORYRECORDS domainName';
            item.documentation = 'Use this command to insert records for Domain objects (Accounts, Groups, Mailing Lists, Forwarders) into the Directory.\ndomainName : string\nThis optional parameter specifies the Domain name. If the Domain name is not specified, the command applies to the authenticated user Domain. This command can be used by Domain Administrators only if they have the CentralDirectory access right.';
            break;
        }
        case 326: {
            item.detail = '(CLI/API) DELETEDIRECTORYRECORDS domainName';
            item.documentation = 'Use this command to delete Domain object records from the Directory.\ndomainName : string\nThis optional parameter specifies the Domain name. If the Domain name is not specified, the command applies to the authenticated user Domain. This command can be used by Domain Administrators only if they have the CentralDirectory access right.';
            break;
        }
        case 327: {
            item.detail = '(CLI/API) CREATEACCOUNTSTORAGE domainName PATH storage';
            item.documentation = 'Use this command to create a "storage mount point" for new Accounts in the Domain. \ndomainName : string\nThis parameter specifies the Domain name.\nstorage : string\nThis parameter specifies the "storage mount Point" name.';
            break;
        }
        case 328: {
            item.detail = '(CLI/API) LISTACCOUNTSTORAGE domainName';
            item.documentation = 'Use this command to list Account "storage mount points" in the specified Domain. \nThe command produces an output - an array with "storage mount points" names.\ndomainName : string\nThis parameter specifies the Domain name.';
            break;
        }
        case 329: {
            item.detail = '(CLI/API) SETDOMAINALIASES domainName newAliases';
            item.documentation = 'Use this command to set the Domain aliases. domainName : string\nThis parameter specifies the name of an existing Domain.\nnewAliases : array\nThis array should contain the Domain alias name strings. All old Domain aliases are removed.';
            break;
        }
        case 330: {
            item.detail = '(CLI/API) SETDOMAINSETTINGS domainName newSettings';
            item.documentation = 'Use this command to change the Domain settings.\ndomainName : string\nThis parameter specifies the name of an existing Domain.\nnewSettings : dictionary\nThis dictionary is used to replace the Domain settings dictionary. All old Domain settings are removed.';
            break;
        }
        case 331: {
            item.detail = '(CLI/API) SETACCOUNTDEFAULTS [ domainName ] newSettings';
            item.documentation = 'Use this command to change the Default Account settings for the specified Domain. \ndomainName : string\nThis parameter specifies the Domain name.\nnewSettings : dictionary\nThis dictionary is used to replace the Domain Default Account settings. All old Account Default settings are removed.';
            break;
        }
        case 332: {
            item.detail = '(CLI/API) SETACCOUNTTEMPLATE [ domainName ] newSettings';
            item.documentation = 'Use this command to change the Account Template settings.\ndomainName : string\nThis optional parameter specifies the Domain name. If the Domain name is not specified, the command applies to the administrator Domain.\nnewSettings : dictionary\nThis dictionary is used to update the Domain Account Template. All new Accounts in the specified Domain will be created with the Template settings. All old Account Template settings are removed.';
            break;
        }
        case 333: {
            item.detail = '(CLI/API) GETDOMAINLOCATION [ domainName ]';
            item.documentation = 'Use this command to get the Domain file directory path (relative to the Server base directory). The command produces an output - a string with the Domain file path.\ndomainName : string\nThis optional parameter specifies the Domain name. If the Domain name is not specified, the command applies to the administrator Domain.';
            break;
        }
        case 334: {
            item.detail = '(CLI/API) SUSPENDDOMAIN domainName';
            item.documentation = 'Use this command to suspend a Domain, so all currently active Accounts are closed and no Account can be opened in this Domain.\ndomainName : string\nThis parameter specifies the name of the Domain to be suspended.';
            break;
        }
        case 335: {
            item.detail = '(CLI/API) RESUMEDOMAIN domainName';
            item.documentation = 'Use this command to resume a Domain, so Accounts can be opened in this Domain.\ndomainName : string\nThis parameter specifies the name of the Domain to be resumed.';
            break;
        }
        case 336: {
            item.detail = '(CLI/API) CREATEACCOUNT accountName [ accountType ] [ PATH storage ] [ LEGACY ] [ settings ]';
            item.documentation = 'Use this command to create new accounts.\naccountName : string \nThis parameter specifies the name for the new Account. The name can contain the @ symbol followed by the Domain name, in this case the Account is created in the specified Domain. If the Domain name is not specified, the command applies to the administrator Domain. \naccountType : MultiMailbox | TextMailbox | MailDirMailbox | SlicedMailbox | AGrade | BGrade | CGrade\nThis optional parameter specifies the type of the Account to create. If no Account type is specified a MultiMailbox-type Account is created.\nstorage : string\nThis optional parameter specifies the "storage mount Point" directory for the Account data (the name should be specified without the .mnt suffix).\nLEGACY\nthis optional flag tells the system to create an Account with a Legacy (visible for legacy mailers) INBOX. \nsettings : dictionary\nThis optional parameter specifies the initial Account settings. Account is created using the settings specified in the Account Template for the target Domain. If the settings parameter is specified, it is used to modify the Template settings. This command can be used by Domain Administrators only if they have the CanCreateAccounts access right. Additionally, if a single-mailbox Account format is requested or the LEGACY flag is used, the Domain Administrators must have the CanCreateSpecialAccounts access right. If this command is used by a Domain Administrator, it will use only those Account settings this Administrator is allowed to modify.';
            break;
        }
        case 337: {
            item.detail = '(CLI/API) RENAMEACCOUNT oldAccountName into newAccountName [ PATH storage ]';
            item.documentation = 'Use this command to rename Accounts.\noldAccountName : string \nThis parameter specifies the name of an existing Account. The name can include the Domain name. \nnewAccountName : string\nThis parameter specifies the new Account name. The name can include the Domain name. \nstorage : string\nThis optional parameter specifies the "storage mount Point" directory for the moved Account data (the name should be specified without the .mnt suffix). This command can be used by Domain Administrators only if they have the CanCreateAccounts access right.';
            break;
        }
        case 338: {
            item.detail = '(CLI/API) DELETEACCOUNT oldAccountName';
            item.documentation = 'Use this command to remove Accounts.\noldAccountName : string \nThis parameter specifies the name of an existing Account. The name can include the Domain name. This command can be used by Domain Administrators only if they have the CanCreateAccounts access right.';
            break;
        }
        case 339: {
            item.detail = '(CLI/API) SETACCOUNTTYPE accountName accountType';
            item.documentation = 'Use this command to change the Account type.\naccountName : string \nThis parameter specifies the name of an existing Account. The name can include the Domain name. \naccountType : MultiMailbox | AGrade | BGrade | CGrade\nThis parameter specifies the new Account type. The current Account type must also belong to this type set. This command can be used by Domain Administrators only if they have the CanCreateAccounts access right.';
            break;
        }
        case 340: {
            item.detail = '(CLI/API) GETACCOUNTSETTINGS accountName';
            item.documentation = 'Use this command to get the Account settings. The command produces an output - a dictionary with the Account settings. Only the explicitly set (not the default) Account settings are included into the dictionary.\naccountName : string \nThis parameter specifies the name of an existing Account. The name can include the Domain name. You can also specify the single asterisk (*) symbol instead of an Account name. This will indicate the current authenticated Account. \nNote: All users can send the GETACCOUNTSETTINGS command for their own Accounts.';
            break;
        }
        case 341: {
            item.detail = '(CLI/API) UPDATEACCOUNTSETTINGS accountName newSettings';
            item.documentation = 'Use this command to update the Account settings.\naccountName : string \nThis parameter specifies the name of an existing Account. The name can include the Domain name. \nnewSettings : dictionary\nThis dictionary is used to update the Account settings dictionary. It does not have to contain all settings data, the omitted settings will be left unmodified. If a new setting value is specified as the string default, the Account setting value is removed, so the default Account setting value will be used. If this command is used by a Domain Administrator, it will update only those Account settings this Administrator is allowed to modify.';
            break;
        }
        case 342: {
            item.detail = '(CLI/API) GETACCOUNTEFFECTIVESETTINGS accountName';
            item.documentation = 'Use this command to get the effective Account settings. The command produces an output - a dictionary with the Account settings. Both the explicitly set and the default Account settings are included into the dictionary.\naccountName : string \nThis parameter specifies the name of an existing Account. The name can include the Domain name (see above). You can also specify the single asterisk (*) symbol instead of an Account name. This will indicate the current authenticated Account. \nNote: All users can send the GETACCOUNTEFFECTIVESETTINGS command for their own Accounts.';
            break;
        }
        case 343: {
            item.detail = '(CLI/API) SETACCOUNTPASSWORD accountName PASSWORD newPassword [ METHOD method ] [ CHECK ]';
            item.documentation = 'Use this command to update the Account password.\naccountName : string \nThis parameter specifies the name of an existing Account. The name can include the Domain name. \nnewPassword : string\nThis string specifies the new Account password. The new password will be stored using the effective Password Encryption setting of the target Account.\nmethod : string\nThis optional parameter specifies the Account Access Mode. If this mode is "SIP", the the Alternative SIP Password Setting is modified, if this mode is RADIUS, then the Alternative RADIUS Password Setting is modified. In all other cases, the CommuniGate Password setting is modified. The new password will be stored using the effective Password Encryption setting of the target Account. To use this command, the user should have the "Basic Settings" Domain Administration right for the target Account Domain. \nAny user can modify her own Account password. In this case, or when the CHECK keyword is explicitly specified, the operation succeeds only if the the supplied password matches the size and complexity restrictions and the Account CanModifyPassword effective Setting is enabled.';
            break;
        }
        case 344: {
            item.detail = '(CLI/API) VERIFYACCOUNTPASSWORD accountName PASSWORD password';
            item.documentation = 'Use this command to verify the Account password.\naccountName : string \nThis parameter specifies the name of an existing Account. The name can include the Domain name. \npassword : string\nThis string is used to specify the password to check (in the clear text format). To use this command, the user should have any Domain Administration right for the target Account Domain.';
            break;
        }
        case 345: {
            item.detail = '(CLI/API) GETACCOUNTALIASES accountName';
            item.documentation = 'Use this command to get the list of Account aliases. The command produces an output - an array with the Account alias names.\naccountName : string \nThis parameter specifies the name of an existing Account. The name can include the Domain name.';
            break;
        }
        case 346: {
            item.detail = '(CLI/API) SETACCOUNTALIASES accountName newAliases';
            item.documentation = 'Use this command to set the Account aliases.\naccountName : string \nThis parameter specifies the name of an existing Account. The name can include the Domain name. \nnewAliases : array\nThis array should contain the Account alias name strings. All old Account aliases are removed. This command can be used by Domain Administrators only if they have the CanCreateAliases access right.';
            break;
        }
        case 347: {
            item.detail = '(CLI/API) GETACCOUNTTELNUMS accountName';
            item.documentation = 'Use this command to get the list of telephone numbers assigned to the Account. The command produces an output - an array with the assigned numbers.\naccountName : string \nThis parameter specifies the name of an existing Account. The name can include the Domain name.';
            break;
        }
        case 348: {
            item.detail = '(CLI/API) SETACCOUNTTELNUMS accountName newTelnums';
            item.documentation = 'Use this command to assign telephone numbers to the Account.\naccountName : string \nThis parameter specifies the name of an existing Account. The name can include the Domain name. \nnewTelnums : array\nThis array should contain the telephone number strings. All old numbers assigned to the Account are removed. This command can be used by Domain Administrators only if they have the CanCreateTelnums access right.';
            break;
        }
        case 349: {
            item.detail = '(CLI/API) MODIFYACCOUNTTELNUMS accountName parameters';
            item.documentation = 'Use this command to change telephone numbers assigned to the Account.\naccountName : string \nThis parameter specifies the name of an existing Account. The name can include the Domain name. \nparameters : dictionary\nThis dictionary should contain the op string element specifying the requested operation: add \nthe parameters dictionary must contain the telnum string element with a telnum number to be added (atomically) to the set of Telnums assigned to the specified Account. If this set already contains this Telnum, an error code is returned.\ndel\nthe parameters dictionary must contain the telnum string element with a telnum number to be removed (atomically) from the set of Telnums assigned to the specified Account. If this set does not contain this Telnum, an error code is returned.\npop\nThe parameters dictionary must not contain any other elements. The first Telnum assigned to the specified Account is atomically removed from the Account Telnum set, and copied into the command result dictionary. If the Account Telnum set was empty, no error code is returned, and no element is copied into the command result dictionary. The command produces an output - a dictionary. For the pop operation, this dictionary can contain the telnum string element - the Telnum removed from the Account Telnum set. \nThis command can be used by Domain Administrators only if they have the CanCreateTelnumsaccess right.';
            break;
        }
        case 350: {
            item.detail = '(CLI/API) GETACCOUNTMAILRULES accountName';
            item.documentation = 'Use this command to get the list of Account Queue Rules. The command produces an output - an array of the Queue Rules specified for the Account.\naccountName : string \nThis parameter specifies the name of an existing Account. The name can include the Domain name.';
            break;
        }
        case 351: {
            item.detail = '(CLI/API) SETACCOUNTMAILRULES accountName newRules';
            item.documentation = 'Use this command to set the Account Queue Rules.\naccountName : string \nThis parameter specifies the name of an existing Account. The name can include the Domain name. \nnewRules : array\nThis array should contain the Account Queue Rules. All old Account Queue Rules are removed. This command can be used by Domain Administrators only if they have the RulesAllowed access right. This command can be used by any Account user to modify own Rules (subject to "allowed actions" restrictions).';
            break;
        }
        case 352: {
            item.detail = '(CLI/API) GETACCOUNTSIGNALRULES accountName';
            item.documentation = 'Use this command to get the list of Account Signal Rules. The command produces an output - an array of the Signal Rules specified for the Account.\naccountName : string \nThis parameter specifies the name of an existing Account. The name can include the Domain name.';
            break;
        }
        case 353: {
            item.detail = '(CLI/API) SETACCOUNTSIGNALRULES accountName newRules';
            item.documentation = 'Use this command to set the Account Signal Rules.\naccountName : string \nThis parameter specifies the name of an existing Account. The name can include the Domain name. \nnewRules : array\nThis array should contain the Account Signal Rules. All old Account Signal Rules are removed. This command can be used by Domain Administrators only if they have the SignalRulesAllowed access right.';
            break;
        }
        case 354: {
            item.detail = '(CLI/API) UPDATEACCOUNTMAILRULE accountName newRule\nUPDATEACCOUNTMAILRULE accountName DELETE oldRule';
            item.documentation = 'Use these commands to update an Account Queue Rule. \naccountName : string\nThis parameter specifies the name of an existing Account. The name can include the Domain name.\nnewRule : array\nThis parameter should be an array, its first element specifies the Rule priority, its second element specifies the Rule name. The optional third, forth, and fifth elements specify the Rule conditions, Rule actions, and Rule comment. If the parameter array contains less than 4 elements, the array first element is used to update the priority of the already existing Rule with the name specified as the second array element. If such a Rule does not exist, the command returns an error. If the parameter array contains 4 or more elements, the entire parameter array is stored as a new Rule. If there is an existing Rule with the same name, it is removed.\noldRule : string\nThis string parameter (specified after the DELETE keyword) specifies a name of the Rule to be removed. If such a Rule does not exist, the command does nothing and it does not return an error. The UpdateAccountMailRule command can be used by Domain Administrators only if they have the RulesAllowed access right. This command can be used by any Account user to modify own Rules (subject to "allowed actions" restrictions).';
            break;
        }
        case 355: {
            item.detail = '(CLI/API) UPDATEACCOUNTSIGNALRULE accountName newRule\nUPDATEACCOUNTSIGNALRULE accountName DELETE oldRule';
            item.documentation = 'Use these commands to update an Account Signal Rule. \naccountName : string\nThis parameter specifies the name of an existing Account. The name can include the Domain name.\nnewRule : array\nThis parameter should be an array, its first element specifies the Rule priority, its second element specifies the Rule name. The optional third, forth, and fifth elements specify the Rule conditions, Rule actions, and Rule comment. If the parameter array contains less than 4 elements, the array first element is used to update the priority of the already existing Rule with the name specified as the second array element. If such a Rule does not exist, the command returns an error. If the parameter array contains 4 or more elements, the entire parameter array is stored as a new Rule. If there is an existing Rule with the same name, it is removed.\noldRule : string\nThis string parameter (specified after the DELETE keyword) specifies a name of the Rule to be removed. If such a Rule does not exist, the command does nothing and it does not return an error. The UpdateAccountSignalRule command can be used by Domain Administrators only if they have the SignalRulesAllowed access right. This command can be used by any Account user to modify own Rules (subject to "allowed actions" restrictions).';
            break;
        }
        case 356: {
            item.detail = '(CLI/API) GETACCOUNTRPOPS accountName';
            item.documentation = 'Use this command to get the list of Account RPOP records. The command produces an output - a dictionary with RPOP records specified for the Account.\naccountName : string \nThis parameter specifies the name of an existing Account. The name can include the Domain name.';
            break;
        }
        case 357: {
            item.detail = '(CLI/API) SETACCOUNTRPOPS accountName newRecords';
            item.documentation = 'Use this command to set the Account RPOP records.\naccountName : string \nThis parameter specifies the name of an existing Account. The name can include the Domain name. \nnewRecords : dictionary\nThis dictionary should contain the Account RPOP records. All old Account RPOP records are removed. This command can be used by Domain Administrators only if they have the CanModifyRPOP access right.';
            break;
        }
        case 358: {
            item.detail = '(CLI/API) GETACCOUNTRSIPS accountName';
            item.documentation = 'Use this command to get the list of Account RSIP records. The command produces an output - a dictionary with RSIP records specified for the Account.\naccountName : string \nThis parameter specifies the name of an existing Account. The name can include the Domain name.';
            break;
        }
        case 359: {
            item.detail = '(CLI/API) SETACCOUNTRSIPS accountName newRecords';
            item.documentation = 'Use this command to set the Account RSIP records.\naccountName : string \nThis parameter specifies the name of an existing Account. The name can include the Domain name. \nnewRecords : dictionary\nThis dictionary should contain the Account RSIP records. All old Account RSIP records are removed. This command can be used by Domain Administrators only if they have the CanModifyRSIP access right.';
            break;
        }
        case 360: {
            item.detail = '(CLI/API) UPDATESCHEDULEDTASK accountName taskData';
            item.documentation = 'Use this command to set the Account Scheduled Task records.\naccountName : string \nThis parameter specifies the name of an existing Account. The name can include the Domain name.\ntaskData : dictionary\nThis dictionary should contain the Scheduled Task data: \nid - the Scheduled Task name string. If there is no existing task with this name, a new Scheduled Task record is created. \nprogram - the Scheduled Task program name string. It should be a name of the Real-Time Application available for the Account Domain environment. If this element is not specfied, an existing Scheduled Task record (if any) is deleted. \nparameter - an optional simple Object. When the Scheduled Task program is launched, this Object is passed to it as its startParameter element. \nwhen - a timestamp (GMT time) specifying when the Scheduled Task should be launched. \nperiod - an optional parameter - a day, week, month , or year string, or a number. When specified, the Scheduled Task is automatically re-scheduled after the specified period of time (if this parameter is a number, then it specified the number of seconds). \nIf this parameter is not specified, the Scheduled Task record is removed as soon as the Task is launched. When a Scheduled Task is launched, its main entry point is launched. The Task startParameter array contains the following elements: \nstartParameter[0] is the Scheduled Task name string \nstartParameter[1] is the timestamp specifying the moment the Task was started \nstartParameter[2] (optional) is the Scheduled Task parameter data \nThis command can be used by Domain Administrators with the CanModifyRSIP access right for the target Account.';
            break;
        }
        case 361: {
            item.detail = '(CLI/API) GETACCOUNTRIGHTS accountName';
            item.documentation = 'Use this command to get the array of the Server or Domain access rights granted to the specified user. The command produces output data - an array listing all Account Server Access rights.\naccountName : string \nThis parameter specifies the name of an existing Account. The name can include the Domain name.';
            break;
        }
        case 362: {
            item.detail = '(CLI/API) GETACCOUNTINFO accountName [Key keyName | ( keyList) ]';
            item.documentation = 'Use this command to get an element of the Account "info" dictionary. The command produces an output - see below. \naccountName : string \nThis parameter specifies the name of an existing Account. The name can include the Domain name. You can also specify the single asterisk ( *) symbol instead of an Account name. This will indicate the current authenticated Account. \nkeyList : array\nThis optional parameter specifies the names of the info keys to retrieve. Note that when Account "info" data are stored in .info dictionary files, the "info" elements have dictionary names starting with the hash (#) symbol. You should NOT include the hash symbol into the keyName parameter of the GETACCOUNTINFO command. Sample: GETACCOUNTINFO "user1@domain1.com" (LastLogin,LastAddress) \nNote: the "info" element names are case-sensitive. The output is a dictionary with all those "info" elements that exist and are specified in the keyList array. \nkeyName : string\nThis optional parameter specifies the name of the requested "info" element. It can be specified only if the keyList parameter is not specified. Note that when Account "info" data are stored in .info dictionary files, the "info" elements have dictionary names starting with the hash symbol. You should NOT include the hash symbol into the keyName parameter of the GETACCOUNTINFO command. Sample: GETACCOUNTINFO "user1@domain1.com" Key LastLogin \nNote: the "info" element names are case-sensitive. The output is the specified "info" element. If the element is not found, the output is an empty string - two quotation marks (""). \nNote: All users can use the GETACCOUNTINFO command to retrieve elements from their own Account "info" data.';
            break;
        }
        case 363: {
            item.detail = '(CLI/API) GETACCOUNTPREFS accountName';
            item.documentation = 'Use this command to get the Account Preferences. The command produces an output - a dictionary with the Account Preferences. \naccountName : string \nThis parameter specifies the name of an existing Account. The name can include the Domain name. \nNote: All users can use the GETACCOUNTPREFS command to retrieve their own Account Preferences.';
            break;
        }
        case 364: {
            item.detail = '(CLI/API) UPDATEACCOUNTPREFS accountName newSettings';
            item.documentation = 'Use this command to modify the Account Preferences.\naccountName : string \nThis parameter specifies the name of an existing Account. The name can include the Domain name.\nnewSettings : dictionary\nThis dictionary is used to update the Account Preferences dictionary. It does not have to contain all Preferences data, the omitted elements will be left unmodified. If a new Preferences value is specified as the string default, the Preferences value is removed, so the default Preferences value will be used. This command can be used by Domain Administrators only if they have the WebUserSettings access right.';
            break;
        }
        case 365: {
            item.detail = '(CLI/API) SETACCOUNTPREFS accountName newSettings';
            item.documentation = 'Use this command to set the Account Preferences.\naccountName : string \nThis parameter specifies the name of an existing Account. The name can include the Domain name.\nnewSettings : dictionary\nThis dictionary should contain the new Account Preferences. All old Account Preferences are removed. This command can be used by Domain Administrators only if they have the WebUserSettings access right.';
            break;
        }
        case 366: {
            item.detail = '(CLI/API) GETACCOUNTEFFECTIVEPREFS accountName';
            item.documentation = 'Use this command to get the effective Account Preferences. The command produces an output - a dictionary with Account Preferences. Both the explicitly set and the default settings are included into that dictionary.\naccountName : string \nThis parameter specifies the name of an existing Account. The name can include the Domain name (see above). \nNote: All users can use this command to retrieve their own effective Preferences.';
            break;
        }
        case 367: {
            item.detail = '(CLI/API) KILLACCOUNTSESSIONS accountName';
            item.documentation = 'Use this command to interrupt all Account sessions (POP, IMAP, FTP, WebUser, etc.).\naccountName : string \nThis parameter specifies the name of an existing Account. The name can include the Domain name. \nNote: All Domain Administrators can use this command.';
            break;
        }
        case 368: {
            item.detail = '(CLI/API) GETACCOUNTACL accountName [ AUTH authAccountName ]';
            item.documentation = 'Use this command to get the Account Rights ACLs (Access Control Lists). The command produces an output - a dictionary with the ACL elements.\naccountName : string \nThis parameter specifies the name of an existing Account (target Account). The asterisk (*) symbol can be used to specify the current authenticated Account.\nauthAccountName : string\nThis optional parameter specifies the name of an Account on whose behalf the operation should be executed. If this name is specified, the ACL info is returned only if the specified Account has the Admin access right for the target Account.';
            break;
        }
        case 369: {
            item.detail = '(CLI/API) SETACCOUNTACL accountName [ AUTH authAccountName ] newACL';
            item.documentation = 'Use this command to modify the access control list for the Account Access Rights.\naccountName : string \nThis parameter specifies the name of an existing Account (target Account). The asterisk (*) symbol can be used to specify the current authenticated Account. \nauthAccountName : string\nThis optional parameter specifies the name of an Account on whose behalf the operation should be executed. If this name is specified, the ACL info is updated only if the specified Account has the Admin access right for target Account.\nnewACL : dictionary\nThis parameter specifies the access right elements to be modified. Each dictionary key specifies an identifier, and the key value should be a string with access right symbols. If the key value string starts with the minus ("-") symbol, access rights specified in the string are removed from the access right element. If the key value string starts with the plus ("+") symbol, access rights specified in the string are added to the access right element. In other cases, access rights specified in the string replace the set of rights in the access right element. If the access right element for the specified key did not exist, it is created. If the new access right element has empty set of access rights, the element is removed.';
            break;
        }
        case 370: {
            item.detail = '(CLI/API) GETACCOUNTACLRIGHTS accountName AUTH authAccountName';
            item.documentation = 'This command produces an output - a string with the effective access rights for the given authAccountName.\naccountName : string \nThis parameter specifies the name of an existing Account (target Account). The asterisk (*) symbol can be used to specify the current authenticated Account. \nauthAccountName : string\nThis parameter specifies the name of an Account whose effective access rights for the target Account should be retrieved.';
            break;
        }
        case 371: {
            item.detail = '(CLI/API) SETACCOUNTSETTINGS accountName newSettings';
            item.documentation = 'Use this command to change the Account settings.\naccountName : string \nThis parameter specifies the name of an existing Account.\nnewSettings : dictionary\nThis dictionary is used to replace the Account settings dictionary. All old Account settings are removed.';
            break;
        }
        case 372: {
            item.detail = '(CLI/API) GETACCOUNTLOCATION accountName';
            item.documentation = 'Use this command to get the Account file directory path (for multi-mailbox Accounts) or the Account INBOX Mailbox path (for single-mailbox Accounts). The command produces an output - a string with the Account file path. The path is relative to the file directory of the Account Domain.\naccountName : string \nThis parameter specifies the name of an existing Account. The name can include the Domain name.';
            break;
        }
        case 373: {
            item.detail = '(CLI/API) GETACCOUNTPRESENCE accountName';
            item.documentation = 'Use this command to get the Account "presence" status. The command produces an output: \narray of two strings - the Account "presence" status and its custom status message, or \nstring - the Account "presence" status (if no custom status message is set), or \nnull-object - if the Account "presence" status is not set at all. \naccountName : string \nThis parameter specifies the name of an existing Account. The name can include the Domain name.';
            break;
        }
        case 374: {
            item.detail = '(CLI/API) LISTGROUPS [ domainName ]';
            item.documentation = 'Use this command to get the list of all Groups in the Domain. The command produces output data - an array with the names of all Groups in the specified (or default) Domain.\ndomainName : string \nThis optional parameter specifies the Domain name. If the Domain name is not specified, the command applies to the administrator Domain.';
            break;
        }
        case 375: {
            item.detail = '(CLI/API) CREATEGROUP groupName [ settings ]';
            item.documentation = 'Use this command to create new Groups.\ngroupName : string \nThis parameter specifies the name for the new Group. The name can contain the @ symbol followed by the Domain name, in this case the Group is created in the specified Domain. If the Domain name is not specified, the command applies to the administrator Domain. \nsettings : dictionary\nThis optional parameter specifies the initial Group settings and the members list. This command can be used by Domain Administrators only if they have the CanCreateGroups access right.';
            break;
        }
        case 376: {
            item.detail = '(CLI/API) RENAMEGROUP oldGroupName into newGroupName';
            item.documentation = 'Use this command to rename Groups.\noldGroupName : string \nThis parameter specifies the name of an existing Group. The name can include the Domain name. \nnewGroupName : string\nThis parameter specifies the new Group name. The name can include the Domain name. This command can be used by Domain Administrators only if they have the CanCreateGroups access right.';
            break;
        }
        case 377: {
            item.detail = '(CLI/API) DELETEGROUP groupName';
            item.documentation = 'Use this command to remove Groups.\ngroupName : string \nThis parameter specifies the name of an existing Group. The name can include the Domain name. This command can be used by Domain Administrators only if they have the CanCreateGroups access right.';
            break;
        }
        case 378: {
            item.detail = '(CLI/API) GETGROUP groupName';
            item.documentation = 'Use this command to get the Group settings. The command produces an output - a dictionary with the Group settings and members.\ngroupName : string \nThis parameter specifies the name of an existing Group. The name can include the Domain name.';
            break;
        }
        case 379: {
            item.detail = '(CLI/API) SETGROUP groupName newSettings';
            item.documentation = 'Use this command to set the Group settings.\ngroupName : string \nThis parameter specifies the name of an existing Group. The name can include the Domain name.\nnewSettings : dictionary\nThis dictionary is used to replace the Group settings dictionary. This command can be used by Domain Administrators only if they have the CanCreateGroups access right.';
            break;
        }
        case 380: {
            item.detail = '(CLI/API) LISTFORWARDERS [ domainName ]';
            item.documentation = 'Use this command to get the list of all Forwarders in the Domain. The command produces output data - an array with the names of all Forwarders in the specified (or default) Domain.\ndomainName : string \nThis optional parameter specifies the Domain name. If the Domain name is not specified, the command applies to the administrator Domain.';
            break;
        }
        case 381: {
            item.detail = '(CLI/API) CREATEFORWARDER forwarderName TO address';
            item.documentation = 'Use this command to create new Forwarders.\nforwarderName : string \nThis parameter specifies the name for the new Forwarder. The name can contain the @ symbol followed by the Domain name, in this case the Forwarder is created in the specified Domain. If the Domain name is not specified, the command applies to the administrator Domain. \naddress : string\nThis parameter specifies the E-mail address the Forwarder should reroute E-mail messages and Signals to. This command can be used by Domain Administrators only if they have the CanCreateForwardersaccess right.';
            break;
        }
        case 382: {
            item.detail = '(CLI/API) RENAMEFORWARDER oldForwarderName INTO newForwarderName';
            item.documentation = 'Use this command to rename Forwarders.\noldForwarderName : string \nThis parameter specifies the name of an existing Forwarder. The name can include the Domain name. \nnewForwarderName : string\nThis parameter specifies the new Forwarder name. The name can include the Domain name. This command can be used by Domain Administrators only if they have the CanCreateForwardersaccess right.';
            break;
        }
        case 383: {
            item.detail = '(CLI/API) DELETEFORWARDER forwarderName';
            item.documentation = 'Use this command to remove Forwarders.\nforwarderName : string \nThis parameter specifies the name of an existing Forwarder. The name can include the Domain name. This command can be used by Domain Administrators only if they have the CanCreateForwardersaccess right.';
            break;
        }
        case 384: {
            item.detail = '(CLI/API) GETFORWARDER forwarderName';
            item.documentation = 'Use this command to get the Forwarder address. The command produces an output - a string with the E-mail address this Forwarder reroutes all E-mail messages and Signals to.\nforwarderName : string \nThis parameter specifies the name of an existing Forwarder. The name can include the Domain name.';
            break;
        }
        case 385: {
            item.detail = '(CLI/API) FINDFORWARDERS domainName TO forwarderAddress';
            item.documentation = 'Use this command to find all Forwarders pointing to the specified address. The command produces an output - an array with the found Forwarder names.\ndomainName : string \nThis parameter specifies the Domain name.\nforwarderAddress : string\nThis parameter specifies an E-mail address to look for.';
            break;
        }
        case 386: {
            item.detail = '(CLI/API) LISTDOMAINNAMEDTASKS [ domainName ]';
            item.documentation = 'Use this command to get the list of all Named Tasks in the Domain. The command produces output data - a dictionary where the keys are the Named Task names, and the values are dictionaries, containing the Task owner name, the task Real Name, and the name of the Real-Time Application program this Named Task runs.\ndomainName : string \nThis optional parameter specifies the Domain name. If the Domain name is not specified, the command applies to the administrator Domain.';
            break;
        }
        case 387: {
            item.detail = '(CLI/API) LISTACCOUNTNAMEDTASKS accountName';
            item.documentation = 'Use this command to get the list of all Named Tasks owned by the specified Account. The command produces output data - a dictionary containing the same data as the LISTDOMAINNAMEDTASKS command result.\naccountName : string \nThis parameter specifies the owner Account name.';
            break;
        }
        case 388: {
            item.detail = '(CLI/API) CREATENAMEDTASK taskName FOR accountName';
            item.documentation = 'Use this command to create new Named Tasks.\ntaskName : string \nThis parameter specifies the name for the new Named Task. The name can contain the @ symbol followed by the Domain name, in this case the Named Task is created in the specified Domain. If the Domain name is not specified, the command applies to the administrator Domain. \naccountName : string\nThis parameter specifies the owner Account name. It must not contain the @ symbol and a Domain name, as this owner Account must be in the same Domain as the Named Task itself. This command can be used by Domain Administrators only if they have the CanCreateNamedTasksaccess right.';
            break;
        }
        case 389: {
            item.detail = '(CLI/API) RENAMENAMEDTASK oldTaskName into newTaskName';
            item.documentation = 'Use this command to rename Named Tasks.\noldTaskName : string \nThis parameter specifies the name of an existing Named Task. The name can include the Domain name (see above). \nnewTaskName : string\nThis parameter specifies the new Named Task name. This command can be used by Domain Administrators only if they have the CanCreateNamedTasksaccess right.';
            break;
        }
        case 390: {
            item.detail = '(CLI/API) DELETENAMEDTASK taskName';
            item.documentation = 'Use this command to remove Named Tasks.\ntaskName : string \nThis parameter specifies the name of an existing Named Task. The name can include the Domain name (see above). This command can be used by Domain Administrators only if they have the CanCreateNamedTasksaccess right.';
            break;
        }
        case 391: {
            item.detail = '(CLI/API) GETNAMEDTASK taskName';
            item.documentation = 'Use this command to get the Named Task settings. The command produces an output - a dictionary with the Named Task settings.\ntaskName : string \nThis parameter specifies the name of an existing Named Task. The name can include the Domain name.';
            break;
        }
        case 392: {
            item.detail = '(CLI/API) UPDATENAMEDTASK taskName newSettings';
            item.documentation = 'Use this command to set the Named Task settings.\ntaskName : string \nThis parameter specifies the name of an existing Named Task. The name can include the Domain name.\nnewSettings : dictionary\nThis dictionary is used to update the Named Task settings dictionary. This command can be used by Domain Administrators only if they have the CanCreateNamedTasks access right.';
            break;
        }
        case 393: {
            item.detail = '(CLI/API) SETACCOUNTRIGHTS accountName newRights';
            item.documentation = 'Use this command to set the Account Server Access rights.\naccountName : string \nThis parameter specifies the name of an existing Account. The name can include the Domain name. \nnewRights : array\nThis array should contain the Access Right codes. All old Account access rights are removed. To set access rights for an Account in a secondary Domain (i.e. Domain Administration Rights), the user may have only the All Domains Server access right.';
            break;
        }
        case 394: {
            item.detail = '(CLI/API) LISTMAILBOXES accountName [ FILTER filter ] [ AUTH authAccountName ]';
            item.documentation = 'Use this command to get the list of Account Mailboxes. The command produces an output - a dictionary. Each dictionary key specifies a Mailbox name; if the authAccountName user is not specified or if the specified user has the Select access right for this Mailbox, the key value contains a dictionary with Mailbox information; if the specified authAccountName does not have the Select access right, the key value contains an empty array; if there is a "mailbox folder" with the dictionary key, but there is no "regular" Mailbox with that name, the key value is an empty array; if there is a "mailbox folder" with the dictionary key, and there is also a "regular" Mailbox with that name, the key value is an array with one element - the information for the "regular" Mailbox (either a dictionary or an empty array).\naccountName : string \nThis parameter specifies the name of an existing Account. The asterisk (*) symbol can be used to specify the current authenticated Account.\nfilter : string\nThis optional parameter specifies the filter string to apply to Account Mailbox names. The filter can use the same wildcard symbols "*" and "%" as the IMAP LIST command. If the filter is not specified, the filter string "*" is assumed, and all Account Mailboxes are returned.\nauthAccountName : string\nThis optional parameter specifies the name of an Account on whose behalf the LIST operation should be executed. If this name is specified, the output includes only those Mailboxes for which the specified Account has the Lookup Mailbox access right.';
            break;
        }
        case 395: {
            item.detail = '(CLI/API) CREATEMAILBOX accountName MAILBOX mailboxName [ CLASS mailboxClass ] [ AUTH authAccountName ]';
            item.documentation = 'Use this command to create a Mailbox in the specified Account. \naccountName : string \nThis parameter specifies the name of an existing Account. The asterisk (*) symbol can be used to specify the current authenticated Account.\nmailboxName : string\nThis parameter specifies the name for the new Mailbox.\nauthAccountName : string\nThis optional parameter specifies the name of an Account on whose behalf this operation should be executed.\nmailboxClass : string\nThis optional parameter specifies the Mailbox class for the new Mailbox';
            break;
        }
        case 396: {
            item.detail = '(CLI/API) DELETEMAILBOX accountName MAILBOX mailboxName [ AUTH authAccountName ] DELETEMAILBOX accountName MAILBOXES mailboxName [ AUTH authAccountName ]';
            item.documentation = 'Use this command to remove a Mailbox from the specified Account. If the keyword MAILBOXES is used, all nested Mailboxes (submailboxes) are deleted, too. \naccountName : string \nThis parameter specifies the name of an existing Account. The asterisk (*) symbol can be used to specify the current authenticated Account.\nmailboxName : string\nThis parameter specifies the name of the Mailbox to be deleted.\nauthaccountname : string\nThis optional parameter specifies the name of an Account on whose behalf the operation should be executed. If this name is specified, the Mailbox is deleted only if the specified Account has the Create access right for the "outer" Mailbox (this means that an Account should have the Create access right for the Archive Mailbox in order to delete the Archive/March Mailbox), and the specified Account should have the DELETE right for the specified Mailbox.';
            break;
        }
        case 397: {
            item.detail = '(CLI/API) RENAMEMAILBOX accountName MAILBOX mailboxName INTO newMailboxName [ AUTH authAccountName ] RENAMEMAILBOX accountName MAILBOXES mailboxName INTO newMailboxName [ AUTH authAccountName ]';
            item.documentation = 'Use this command to rename a Mailbox in the specified Account. If the keyword MAILBOXES is used, all nested Mailboxes (submailboxes) are renamed, too. \naccountName : string \nThis parameter specifies the name of an existing Account. The asterisk (*) symbol can be used to specify the current authenticated Account.\nmailboxName : string\nThis parameter specifies the name of the Mailbox to be renamed.\nnewMailboxName : string\nThis parameter specifies the new name for the Mailbox.\nauthaccountname : string\nThis optional parameter specifies the name of an Account on whose behalf the operation should be executed. If this name is specified, the Mailbox is renamed only if the specified Account has a right to perform the DELETEMAILBOX operation with the original Mailbox name and the CREATEMAILBOX operation with the new Mailbox name.';
            break;
        }
        case 398: {
            item.detail = '(CLI/API) GETMAILBOXINFO accountName MAILBOX mailboxName [ AUTH authAccountName ]';
            item.documentation = 'Use this command to get the internal information about the Account Mailbox. The command produces an output - a dictionary with the Mailbox internal information. \naccountName : string \nThis parameter specifies the name of an existing Account. The asterisk (*) symbol can be used to specify the current authenticated Account.\nmailboxName : string\nThis parameter specifies the name of an existing Mailbox in the specified Account.\nauthaccountname : string\nThis optional parameter specifies the name of an Account on whose behalf the operation should be executed. If this name is specified, the Mailbox info is returned only if the specified Account has the Select Mailbox access right.';
            break;
        }
        case 399: {
            item.detail = '(CLI/API) GETMAILBOXACL accountName MAILBOX mailboxName [ AUTH authAccountName ]';
            item.documentation = 'Use this command to get the access control list for the Account Mailbox. The command produces an output - a dictionary with the Mailbox access elements. \naccountName : string \nThis parameter specifies the name of an existing Account. The asterisk (*) symbol can be used to specify the current authenticated Account.\nmailboxName : string\nThis parameter specifies the name of an existing Mailbox in the specified Account.\nauthaccountname : string\nThis optional parameter specifies the name of an Account on whose behalf the operation should be executed. If this name is specified, the ACL info is returned only if the specified Account has the Admin access right for the specified Mailbox.';
            break;
        }
        case 400: {
            item.detail = '(CLI/API) SETMAILBOXACL accountName MAILBOX mailboxName [ AUTH authAccountName ] newACL';
            item.documentation = 'Use this command to modify the access control list for the Account Mailbox. \naccountName : string \nThis parameter specifies the name of an existing Account. The asterisk (*) symbol can be used to specify the current authenticated Account.\nmailboxName : string\nThis parameter specifies the name of an existing Mailbox in the specified Account.\nauthaccountname : string\nThis optional parameter specifies the name of an Account on whose behalf the operation should be executed. If this name is specified, the ACL info is updated only if the specified Account has the Admin access right for the specified Mailbox.\nnewACL : dictionary\nThis parameter specifies the access right elements to be modified. Each dictionary key specifies an identifier, and the key value should be a string with access right symbols. If the key value string starts with the minus ("-") symbol, access rights specified in the string are removed from the access right element. If the key value string starts with the plus ("+") symbol, access rights specified in the string are added to the access right element. In other cases, access rights specified in the string replace the set of rights in the access right element. If the access right element for the specified key did not exist, it is created. If the new access right element has empty set of access rights, the element is removed.';
            break;
        }
        case 401: {
            item.detail = '(CLI/API) GETMAILBOXRIGHTS accountName MAILBOX mailboxName AUTH authAccountName';
            item.documentation = 'This command produces an output - a string with the effective Mailbox access rights for the given authAccountName. \naccountName : string \nThis parameter specifies the name of an existing Account. The asterisk (*) symbol can be used to specify the current authenticated Account.\nmailboxName : string\nThis parameter specifies the name of an existing Mailbox in the specified Account.\nauthaccountname : string\nThis parameter specifies the name of an Account whose effective access rights should be retrieved.';
            break;
        }
        case 402: {
            item.detail = '(CLI/API) SETMAILBOXCLASS accountName MAILBOX mailboxName [ AUTH authAccountName ] CLASS newClass';
            item.documentation = 'Use this command to set the "class" of an Account Mailbox. \naccountName : string \nThis parameter specifies the name of an existing Account. The asterisk (*) symbol can be used to specify the current authenticated Account.\nmailboxName : string\nThis parameter specifies the name of an existing Mailbox in the specified Account.\nauthaccountname : string\nThis optional parameter specifies the name of an Account whose Mailbox access rights should be used.\nnewClass : string\nThe Mailbox class.';
            break;
        }
        case 403: {
            item.detail = '(CLI/API) GETMAILBOXSUBSCRIPTION accountName';
            item.documentation = 'This command produces an output - an array with the list of Account "subscribed Mailboxes". \naccountName : string \nThis parameter specifies the name of an existing Account. The asterisk (*) symbol can be used to specify the current authenticated Account.';
            break;
        }
        case 404: {
            item.detail = '(CLI/API) SETMAILBOXSUBSCRIPTION accountName newSubscription';
            item.documentation = 'Use this command to set the Account "subscribed Mailboxes" list. \naccountName : string \nThis parameter specifies the name of an existing Account. The asterisk (*) symbol can be used to specify the current authenticated Account.\nnewSubscription : array\nThe list of subscribed Mailboxes. Each array element should be a string with a Mailbox name.';
            break;
        }
        case 405: {
            item.detail = '(CLI/API) GETMAILBOXALIASES accountName';
            item.documentation = 'This command produces an output - a dictionary. Each dictionary key is the name of an existing Mailbox alias, and the key value is a string with the name of Mailbox this alias points to. \naccountName : string \nThis parameter specifies the name of an existing Account. The asterisk (*) symbol can be used to specify the current authenticated Account.';
            break;
        }
        case 406: {
            item.detail = '(CLI/API) SETMAILBOXALIASES accountName newAliases';
            item.documentation = 'Use this command to set the Account Mailbox aliases. \naccountName : string \nThis parameter specifies the name of an existing Account. The asterisk (*) symbol can be used to specify the current authenticated Account.\nnewAliases : dictionary\nThe set of new Mailbox aliases.';
            break;
        }
        case 407: {
            item.detail = '(CLI/API) GETDOMAINALERTS [ domainName ]';
            item.documentation = 'Use this command to get the Domain Alerts. The command produces an output - a dictionary with the Domain alert strings and time stamps. \ndomainName : string \nThis optional parameter specifies the name of an existing Domain.';
            break;
        }
        case 408: {
            item.detail = '(CLI/API) SETDOMAINALERTS [ domainName ] newAlerts';
            item.documentation = 'Use this command to change the Domain alerts. \ndomainName : string \nThis optional parameter specifies the name of an existing Domain.\nnewAlerts : dictionary\nThis dictionary is used to replace the Domain alert dictionary. All old Domain alerts are removed.';
            break;
        }
        case 409: {
            item.detail = '(CLI/API) POSTDOMAINALERT domainName ALERT newAlert';
            item.documentation = 'Use this command to post a Domain-wide alert message. \ndomainName : string \nThis parameter specifies the name of an existing Domain.\nnewAlert : string\nThis string specifies the Alert text.';
            break;
        }
        case 410: {
            item.detail = '(CLI/API) REMOVEDOMAINALERT domainName ALERT timeStamp';
            item.documentation = 'Use this command to remove a Domain-wide alert message. \ndomainName : string \nThis parameter specifies the name of an existing Domain.\ntimeStamp : string\nThis string specifies the time stamp of the Alert message to be removed.';
            break;
        }
        case 411: {
            item.detail = '(CLI/API) GETACCOUNTALERTS accountName';
            item.documentation = 'Use this command to get the Account Alerts. The command produces an output - a dictionary with the Account alert strings and time stamps. \naccountName : string \nThis parameter specifies the name of an existing Account. The asterisk (*) symbol can be used to specify the current authenticated Account.';
            break;
        }
        case 412: {
            item.detail = '(CLI/API) SETACCOUNTALERTS accountName newAlerts';
            item.documentation = 'Use this command to change the Account alerts. \naccountName : string \nThis parameter specifies the name of an existing Account. The asterisk (*) symbol can be used to specify the current authenticated Account.\nnewAlerts : dictionary\nThis dictionary is used to replace the Account alert dictionary. All old Account alerts are removed.';
            break;
        }
        case 413: {
            item.detail = '(CLI/API) POSTACCOUNTALERT accountName ALERT newAlert';
            item.documentation = 'Use this command to post an Account alert message. \naccountName : string \nThis parameter specifies the name of an existing Account. The asterisk (*) symbol can be used to specify the current authenticated Account.\nnewAlert : string\nThis string specifies the Alert text.';
            break;
        }
        case 414: {
            item.detail = '(CLI/API) REMOVEACCOUNTALERT accountName ALERT timeStamp';
            item.documentation = 'Use this command to remove an Account alert message. \naccountName : string \nThis parameter specifies the name of an existing Account. The asterisk (*) symbol can be used to specify the current authenticated Account.\ntimeStamp : string\nThis string specifies the time stamp of the Alert message to be removed.';
            break;
        }
        case 415: {
            item.detail = '(CLI/API) GETSERVERALERTS';
            item.documentation = 'Use this command to get the list of the server-wide Alerts. The command produces an output - a dictionary with the server alert strings and time stamps.';
            break;
        }
        case 416: {
            item.detail = '(CLI/API) SETSERVERALERTS newAlerts';
            item.documentation = 'Use this command to change the server-wide Alerts. \nnewAlerts : dictionary \nThis dictionary is used to replace the server-wide Alert dictionary. All old server-wide alerts are removed.';
            break;
        }
        case 417: {
            item.detail = '(CLI/API) POSTSERVERALERT newAlert';
            item.documentation = 'Use this command to post a server-wide Alert message. \nnewAlert : string \nThis string specifies the Alert text.';
            break;
        }
        case 418: {
            item.detail = '(CLI/API) REMOVESERVERALERT timeStamp';
            item.documentation = 'Use this command to remove a server-wide Alert message. \ntimeStamp : string \nThis string specifies the time stamp of the Alert message to be removed.';
            break;
        }
        case 419: {
            item.detail = '(CLI/API) GETCLUSTERALERTS';
            item.documentation = 'This command is available in the Dynamic Cluster only. Use this command instead of the GETSERVERALERTS command to work with the cluster-wide Alerts.';
            break;
        }
        case 420: {
            item.detail = '(CLI/API) SETCLUSTERALERTS newAlerts';
            item.documentation = 'This command is available in the Dynamic Cluster only. Use this command instead of the SETSERVERALERTS command to work with the cluster-wide Alerts.';
            break;
        }
        case 421: {
            item.detail = '(CLI/API) POSTCLUSTERALERT newAlert';
            item.documentation = 'This command is available in the Dynamic Cluster only. Use this command instead of the POSTSERVERALERT command to work with the cluster-wide Alerts.';
            break;
        }
        case 422: {
            item.detail = '(CLI/API) REMOVECLUSTERALERT timeStamp';
            item.documentation = 'This command is available in the Dynamic Cluster only. Use this command instead of the REMOVESERVERALERT command to work with the cluster-wide Alerts.';
            break;
        }
        case 423: {
            item.detail = '(CLI/API) READSTORAGEFILE accountName FILE fileName [ OFFSET position ] [ SIZE sliceSize ] [ AUTH authAccountName ]';
            item.documentation = 'Use this command to retrieve a file from the Account File Storage. This command produces an output - a array of 3 elements. The first element is a datablock with the content of the specified file, the second element is a timestamp with the file modification date, and the third element is a number equal to the current file size. \naccountName : string \nThis parameter specifies the name of an existing Account. The asterisk (*) symbol can be used to specify the current authenticated Account.\nfileName : string\nThis parameter specifies the name of the File Storage file to be retrieved.\nposition : number\nIf this parameter is specified the File Storage file is read starting from the specified file position.\nsliceSize : number\nIf this parameter is specified, no more than the specified number of file data bytes is returned.\nauthAccountName : string\nThis optional parameter specifies the name of an Account on whose behalf the operation should be executed.';
            break;
        }
        case 424: {
            item.detail = '(CLI/API) WRITESTORAGEFILE accountName FILE fileName [ OFFSET position ] [ AUTH authAccountName ] DATA fileData';
            item.documentation = 'Use this command to store a file in the Account File Storage. If a File Storage file with the specified name already exists, the old file is removed. If the fileName specifies a directory (it ends with the slash (/) symbol) the command creates a directory. In this case, the OFFSET position part must be absent, and the fileData parameter must be an empty datablock. \naccountName : string \nThis parameter specifies the name of an existing Account. The asterisk (*) symbol can be used to specify the current authenticated Account.\nfileName : string\nThis parameter specifies the name for the File Storage file.\nposition : offset\nIf this parameter is absent, or it exists and it is the zero number, the existing file (if any) is removed first, and a new file is created. If this parameter is a non-zero number, its value must be positive; the File Storage file is rewritten/extended starting from the specified file position. The file should already exist, and the specified position should not be larger than the current file size. If this option is BEG, then the file should already exist, the file is rewritten from the beginning, but its old data beyond the end of the fileData (if any) is not removed. If this option is END, then the fileData is appended to the end of the file. If the file does not exist, it is created. If this option is NEW, then the file must not exist, a new file is created and fileData is stored in it. \nauthAccountName : string\nThis optional parameter specifies the name of an Account on whose behalf the operation should be executed.\nfileData : datablock\nThis parameter contains the file data.';
            break;
        }
        case 425: {
            item.detail = '(CLI/API) RENAMESTORAGEFILE accountName FILE oldFileName INTO newFileName [ AUTH authAccountName ]';
            item.documentation = 'Use this command to rename a file or a file directory in the Account File Storage. \naccountName : string \nThis parameter specifies the name of an existing Account. The asterisk (*) symbol can be used to specify the current authenticated Account.\noldFileName : string\nThis parameter specifies the name of an existing File Storage file or file directory. \nnewFileName : string\nThis parameter specifies the new name for the File Storage file or file directory.\nauthAccountName : string\nThis optional parameter specifies the name of an Account on whose behalf the operation should be executed.';
            break;
        }
        case 426: {
            item.detail = '(CLI/API) DELETESTORAGEFILE accountName FILE fileName [ AUTH authAccountName ]';
            item.documentation = 'Use this command to remove a file or a file directory from the Account File Storage. \naccountName : string \nThis parameter specifies the name of an existing Account. The asterisk (*) symbol can be used to specify the current authenticated Account.\nfileName : string\nThis parameter specifies the name of an existing File Storage file or file directory. \nauthAccountName : string\nThis optional parameter specifies the name of an Account on whose behalf the operation should be executed.';
            break;
        }
        case 427: {
            item.detail = '(CLI/API) LISTSTORAGEFILES accountName [ PATH filePath ] [ AUTH authAccountName ]';
            item.documentation = 'Use this command to list all files in the File Storage top directory or in one of its subdirectories. This command produces an output - a dictionary, where each key is a name of the File Storage file, and the key value is a dictionary for a regular file and an empty array for subdirectories. \naccountName : string \nThis parameter specifies the name of an existing Account. The asterisk (*) symbol can be used to specify the current authenticated Account.\nfilePath : string\nThis optional parameter specifies the name of the File Storage subdirectory. You can omit this parameter along with the PATH keyword, in this case the command returns the list of files in the top File Storage directory.\nauthAccountName : string\nThis optional parameter specifies the name of an Account on whose behalf the operation should be executed.';
            break;
        }
        case 428: {
            item.detail = '(CLI/API) GETSTORAGEFILEINFO accountName [ PATH filePath ] [ AUTH authAccountName ]';
            item.documentation = 'Use this command to get the statistical information about all files in the Account File Storage. This command produces an output - an array with 2 number elements. The first element contains the total size of all File Storage files, the second element contains the number of files in the File Storage. \naccountName : string \nThis parameter specifies the name of an existing Account. The asterisk (*) symbol can be used to specify the current authenticated Account.\nauthAccountName : string\nThis optional parameter specifies the name of an Account on whose behalf the operation should be executed.';
            break;
        }
        case 429: {
            item.detail = '(CLI/API) READSTORAGEFILEATTR accountName FILE fileName [ attributes ] [ AUTH authAccountName ]';
            item.documentation = 'Use this command to read attributes of an Account File Storage file or file directory. This command produces an output - an array of XML elements containing file or file directory attributes. \naccountName : string \nThis parameter specifies the name of an existing Account. The asterisk (*) symbol can be used to specify the current authenticated Account.\nfileName : string\nThis parameter specifies the name of an existing File Storage file or file directory. \nattributes : array\nThis optional parameter specifies an array of strings. If specified, only file attributes with names included into this array are retrieved.\nauthAccountName : string\nThis optional parameter specifies the name of an Account on whose behalf the operation should be executed.';
            break;
        }
        case 430: {
            item.detail = '(CLI/API) UPDATESTORAGEFILEATTR accountName FILE fileName attributes [ AUTH authAccountName ]';
            item.documentation = 'Use this command to update attributes of an Account File Storage file or file directory. \naccountName : string \nThis parameter specifies the name of an existing Account. The asterisk (*) symbol can be used to specify the current authenticated Account.\nfileName : string\nThis parameter specifies the name of an existing File Storage file or file directory. \nattributes : array\nThis parameter specifies an array of XML elements - the new file attribute values. \nauthAccountName : string\nThis optional parameter specifies the name of an Account on whose behalf the operation should be executed.';
            break;
        }
        case 431: {
            item.detail = '(CLI/API) GETFILESUBSCRIPTION accountName';
            item.documentation = 'This command produces an output - an array with the list of Account "subscribed files". \naccountName : string \nThis parameter specifies the name of an existing Account. The asterisk (*) symbol can be used to specify the current authenticated Account.';
            break;
        }
        case 432: {
            item.detail = '(CLI/API) SETFILESUBSCRIPTION accountName newSubscription';
            item.documentation = 'Use this command to set the Account "subscribed files" list. \naccountName : string \nThis parameter specifies the name of an existing Account. The asterisk (*) symbol can be used to specify the current authenticated Account.\nnewSubscription : array\nThe list of subscribed files. Each array element should be a string with a file name.';
            break;
        }
        case 433: {
            item.detail = '(CLI/API) LISTLISTS [ domainName ]';
            item.documentation = 'Use this command to get the list of all mailing lists in the Domain. The command produces output data - an array of strings. Each string is the name of a mailing list in the specified (or default) Domain. \ndomainName : string \nThis optional parameter specifies the Domain name.';
            break;
        }
        case 434: {
            item.detail = '(CLI/API) GETDOMAINLISTS [ domainName ]';
            item.documentation = 'Use this command to get the list of all mailing lists in the Domain. The command produces output data - a dictionary. Each dictionary key is the name of a mailing list in the specified (or default) Domain. The key value is a numeric string with the actual number of the list subscribers ("-1" if the current number of subscribers is not known). \ndomainName : string \nThis optional parameter specifies the Domain name.';
            break;
        }
        case 435: {
            item.detail = '(CLI/API) GETACCOUNTLISTS accountName';
            item.documentation = 'Use this command to get the list of all mailing lists belonging to the specified Account. The command produces output data - a dictionary. Each dictionary key is the name of a mailing list belonging to the specified (or default) Account. The key value is a numeric string with the actual number of the list subscribers ("-1" if the current number of subscribers is not known). \naccountName : string \nThis parameter specifies the list"s owner Account name.';
            break;
        }
        case 436: {
            item.detail = '(CLI/API) CREATELIST listName for accountName';
            item.documentation = 'Use this command to create a mailing list. listName : string \nThis parameter specifies the name of a mailing list to create. It can include the Domain name. If the Domain name is not specified, the user Domain is used by default. \naccountName : string\nThis parameter specifies the name of the mailing list owner (without the Domain name). It should be the name of an already existing Account in the mailing list Domain. Domain Administrators can use this command if they have the CanCreateLists Domain access right.';
            break;
        }
        case 437: {
            item.detail = '(CLI/API) RENAMELIST listName into newName';
            item.documentation = 'Use this command to rename a mailing list. listName : string \nThis parameter specifies the name of an existing mailing list. It can include the Domain name. If the Domain name is not specified, the user Domain is used by default.\nnewName : string\nThis parameter specifies the new name for the mailing list (without the Domain part). Domain Administrators can use this command if they have the CanCreateLists Domain access right.';
            break;
        }
        case 438: {
            item.detail = '(CLI/API) DELETELIST listName';
            item.documentation = 'Use this command to remove a mailing list. listName : string \nThis parameter specifies the name of an existing mailing list. It can include the Domain name. If the Domain name is not specified, the user Domain is used by default. Domain Administrators can use this command if they have the CanCreateLists Domain access right.';
            break;
        }
        case 439: {
            item.detail = '(CLI/API) GETLIST listName';
            item.documentation = 'Use this command to retrieve list settings. The command produces an output - a dictionary with the listName mailing list settings. listName : string \nThis parameter specifies the name of an existing mailing list. It can include the Domain name. If the Domain name is not specified, the user Domain is used by default.';
            break;
        }
        case 440: {
            item.detail = '(CLI/API) UPDATELIST listName newSettings';
            item.documentation = 'Use this command to modify list settings. listName : string \nThis parameter specifies the name of an existing mailing list. It can include the Domain name. If the Domain name is not specified, the user Domain is used by default.\nnewSettings : dictionary\nThis dictionary is used to update the mailing list settings dictionary. It does not have to contain all settings data, the omitted settings will be left unmodified.';
            break;
        }
        case 441: {
            item.detail = '(CLI/API) LIST listName operation [silently] [confirm] subscriber';
            item.documentation = 'Use this command to update the subscribers list. listName : string \nThis parameter specifies the name of an existing mailing list. It can include the Domain name. If the Domain name is not specified, the user Domain is used by default.\noperation : subscribe | feed | digest | index | null | banned | unsubscribe\nThis parameter specifies the operation. \nsilently\nThis optional parameter tells the server not to send the Welcome/Bye message to the subscriber.\nconfirm\nThis optional parameter tells the server to send a confirmation request to the subscriber.\nsubscriber : E-mail address\nThe subscriber address. It can include the comment part used as the subscriber"s real name. Sample: LIST MyList@mydomain.com FEED confirm "Bill Jones" <BJones@company.com>';
            break;
        }
        case 442: {
            item.detail = '(CLI/API) LISTSUBSCRIBERS listName [ FILTER filter [ limit ] ]';
            item.documentation = 'Use this command to retrieve list subscribers. The command produces an output - an array with subscribers E-mail addresses. listName : string \nThis parameter specifies the name of an existing mailing list. It can include the Domain name. If the Domain name is not specified, the user Domain is used by default. \nfilter : string\nIf this optional parameter is specified, only the addresses containing the specified string are returned. \nlimit : number\nThis optional parameter limits the number of subscriber addresses returned.';
            break;
        }
        case 443: {
            item.detail = '(CLI/API) READSUBSCRIBERS listName [ FILTER filter [ limit ] ]';
            item.documentation = 'Use this command to retrieve list subscribers. The command produces an output - an array, where the first element is a number - the total number of list subscribers, and the second element is an array of subscriber descriptor dictionaries. listName : string \nThis parameter specifies the name of an existing mailing list. It can include the Domain name. If the Domain name is not specified, the user Domain is used by default. \nfilter : string\nIf this optional parameter is specified, only subscribers with addresses containing the specified string are returned. \nlimit : number\nThis optional parameter limits the number of subscriber dictionaries returned. \nA dictionary describing a subscriber has the following elements: Sub - E-mail address string\nRealName - an optional string with Real name\nmode - a string with subscription mode (index, digest, null, etc.)\nsubscribeTime - timestamp data specifying the moment when this user subscribed.\nposts - number of postings on this list\nlastBounceTime - optional timestamp data specifying the last time when messages sent to this user failed.\nbounces - optional numeric data specifying the number of failed delivery reports received for this user.';
            break;
        }
        case 444: {
            item.detail = '(CLI/API) GETSUBSCRIBERINFO listName NAME subscriberAddress';
            item.documentation = 'Use this command to retrieve information about a list subscriber. The command produces an output - a dictionary with subscriber information. listName : string \nThis parameter specifies the name of an existing mailing list. It can include the Domain name. If the Domain name is not specified, the user Domain is used by default.\nsubscriberAddress : string\nThis parameter specifies the E-mail address of the list subscriber. If the subscriber does not exist, an empty dictionary is returned. Otherwise, the dictionary contains the following elements: mode \nThis string element specified the subscription mode (digest, index, etc.) This element is equal to unsubscribeif the address has been unsubscribed, but has not been removed from the list. This element is equal to subscribe if a user has started subscription, but the subscription has not been confirmed.\nconfirmationID - This element contains the subscriber"s Confirmation ID string.\ntimeSubscribed - This string element specifies when the address was subscribed (in the ACAP date/time format).\nposts - This string element may contain the strings special, moderateAll, prohibited, or the string with the number of messages posted from this address. If the next postings from this address are to be moderated, the element contains an array with one string element that contains the number of postings to be moderated.\nbounces - This optional string element contains the number of bounces received from this address.\nlastBounced - This optional string element specifies the last time when messages to this address bounced were bounced. The data and time are specified in the ACAP format.\nRealName - This optional string element contains the real name of the subscriber.';
            break;
        }
        case 445: {
            item.detail = '(CLI/API) SETPOSTINGMODE listName FOR subscriberAddress [ UNMODERATED | MODERATEALL | PROHIBITED | SPECIAL | numberOfModerated ]';
            item.documentation = 'Use this command to set the posting mode for the specified subscriber. listName : string \nThis parameter specifies the name of an existing mailing list. It can include the Domain name. If the Domain name is not specified, the user Domain is used by default.\nsubscriberAddress : string\nThis parameter specifies the E-mail address of the list subscriber.\npostingMode : number\nThis optional parameter limits the number of subscriber addresses returned. The command sets the posting mode the specified subscriber. If numberOfModerated (a number) is specified, the posting mode set requires moderation of the first numberOfModerated messages from this subscriber.';
            break;
        }
        case 446: {
            item.detail = '(CLI/API) PROCESSBOUNCE listName [ FATAL ] FOR subscriberAddress';
            item.documentation = 'Use this command to perform the same action the List Manager performs when it receives a bounce message for the subscriber address. listName : string \nThis parameter specifies the name of an existing mailing list. It can include the Domain name. If the Domain name is not specified, the user Domain is used by default.\nsubscriberAddress : string\nThis parameter specifies the E-mail address of the list subscriber. Use the FATAL keyword to emulate a "fatal" bounce. Otherwise the command emulates a non-fatal bounce.';
            break;
        }
        case 447: {
            item.detail = '(CLI/API) LISTDOMAINSKINS [ domainName ]';
            item.documentation = 'Use this command to list custom Domain Skins. The command produces an output - an array with Skin names. domainName : string \nThis optional parameter specifies the Domain name. If the Domain name is not specified, the command applies to the administrator Domain.';
            break;
        }
        case 448: {
            item.detail = '(CLI/API) CREATEDOMAINSKIN [ domainName SKIN ] skinName';
            item.documentation = 'Use this command to create a custom Domain Skin. domainName : string \nThis optional parameter specifies the Domain name. If the Domain name is not specified, the command applies to the administrator Domain. If it is specified, it should be followed with the SKIN keyword.\nskinName : string\nThis parameter specifies the name of the new Skin. To create the unnamed Domain Skin, specify an empty string as the skinName parameter value. A named Domain Skin can be created only when the unnamed Domain Skin exists.';
            break;
        }
        case 449: {
            item.detail = '(CLI/API) RENAMEDOMAINSKIN [ domainName SKIN ] skinName INTO newSkinName';
            item.documentation = 'Use this command to rename a custom named Domain Skin. domainName : string \nThis optional parameter specifies the Domain name. If the Domain name is not specified, the command applies to the administrator Domain. If it is specified, it should be followed with the SKIN keyword.\nskinName : string\nThis parameter specifies the name of an existing named Skin.\nnewSkinName : string\nThis parameter specifies the new name for the Skin.';
            break;
        }
        case 450: {
            item.detail = '(CLI/API) DELETEDOMAINSKIN [ domainName SKIN ] skinName';
            item.documentation = 'Use this command to delete a custom Domain Skin. domainName : string \nThis optional parameter specifies the Domain name. If the Domain name is not specified, the command applies to the administrator Domain. If it is specified, it should be followed with the SKIN keyword.\nskinName : string\nThis parameter specifies the name of the Skin to be deleted. To delete the unnamed Domain Skin, specify an empty string as the skinName parameter value. The unnamed Domain Skin can be deleted only when no named Domain Skin exists.';
            break;
        }
        case 451: {
            item.detail = '(CLI/API) LISTDOMAINSKINFILES [ domainName SKIN ] skinName';
            item.documentation = 'Use this command to list files in a custom Domain Skin. The command produces an output - a dictionary with Skin file names as keys. The dictionary element values are dictionaries with file attributes. domainName : string \nThis optional parameter specifies the Domain name. If the Domain name is not specified, the command applies to the administrator Domain. If it is specified, it must be followed with the SKIN keyword.\nskinName : string\nThis parameter specifies the name of an existing Domain Skin.';
            break;
        }
        case 452: {
            item.detail = '(CLI/API) READDOMAINSKINFILE [ domainName SKIN ] skinName FILE fileName';
            item.documentation = 'Use this command to read a file from a custom Domain Skin. The command produces an output - an array. The first array element is a datablock with the Skin file content, the second array element is a timestamp with the file modification date. domainName : string \nThis optional parameter specifies the Domain name. If the Domain name is not specified, the command applies to the administrator Domain. If it is specified, it must be followed with the SKIN keyword.\nskinName : string\nThis parameter specifies the name of an existing Domain Skin.\nfileName : string\nThis parameter specifies the name of an existing file in the specified Domain Skin.';
            break;
        }
        case 453: {
            item.detail = '(CLI/API) STOREDOMAINSKINFILE [ domainName SKIN ] skinName FILE fileName DATA fileContent STOREDOMAINSKINFILE [ domainName SKIN ] skinName FILE fileName DELETE';
            item.documentation = 'Use this command to store a file into a custom Domain Skin, or to delete a file from a custom Domain Skin. domainName : string \nThis optional parameter specifies the Domain name. If the Domain name is not specified, the command applies to the administrator Domain. If it is specified, it must be followed with the SKIN keyword.\nskinName : string\nThis parameter specifies the name of an existing Domain Skin.\nfileName : string\nThis parameter specifies the Skin file name.\nfileContent : datablock\nThis datablock contains file content. This parameter is specified only if the DATA keyword is used. If the DATA keyword is specified and the Skin contains a file with the same name, the old file is deleted. The file with the specified name is removed from the Skin Cache (in the Dynamic Cluster the file is removed from Skin caches on all cluster members).';
            break;
        }
        case 454: {
            item.detail = '(CLI/API) LISTSERVERSKINS';
            item.documentation = 'Use this command to list custom Server Skins. The command produces an output - an array with Skin names.';
            break;
        }
        case 455: {
            item.detail = '(CLI/API) CREATESERVERSKIN skinName';
            item.documentation = 'Use this command to create a custom Server Skin. skinName : string \nThis parameter specifies the name of the new Skin.';
            break;
        }
        case 456: {
            item.detail = '(CLI/API) RENAMESERVERSKIN skinName INTO newSkinName';
            item.documentation = 'Use this command to rename a custom Server Skin. skinName : string \nThis parameter specifies the name of an existing Skin.\nnewSkinName : string\nThis parameter specifies the new name for the Skin.';
            break;
        }
        case 457: {
            item.detail = '(CLI/API) DELETESERVERSKIN skinName';
            item.documentation = 'Use this command to delete a custom Server Skin. skinName : string \nThis parameter specifies the name of the Skin to be deleted.';
            break;
        }
        case 458: {
            item.detail = '(CLI/API) LISTSERVERSKINFILES skinName';
            item.documentation = 'Use this command to list files in a custom Server Skin. The command produces an output - a dictionary with Skin file names as keys. The dictionary element values are dictionaries with file attributes. skinName : string \nThis parameter specifies the name of an existing Server Skin.';
            break;
        }
        case 459: {
            item.detail = '(CLI/API) READSERVERSKINFILE skinName FILE fileName';
            item.documentation = 'Use this command to read a file from a custom Server Skin. The command produces an output - an array. The first array element is a datablock with the Skin file content, the second array element is a timestamp with the file modification date. skinName : string \nThis parameter specifies the name of an existing Server Skin.\nfileName : string\nThis parameter specifies the name of an existing file in the specified Server Skin.';
            break;
        }
        case 460: {
            item.detail = '(CLI/API) STORESERVERSKINFILE skinName FILE fileName DATA fileContent STORESERVERSKINFILE skinName FILE fileName DELETE';
            item.documentation = 'Use this command to store a file into a custom Server Skin, or to delete a file from a custom Server Skin. skinName : string \nThis parameter specifies the name of an existing Server Skin.\nfileName : string\nThis parameter specifies the Skin file name.\nfileContent : datablock\nThis datablock contains the file content. This parameter is specified only if the DATA keyword is used. If the DATA keyword is specified and the Skin contains a file with the same name, the old file is deleted. The file with the specified name is removed from the Skin Cache (in the Dynamic Cluster the file is removed from Skin caches on all cluster members).';
            break;
        }
        case 461: {
            item.detail = '(CLI/API) LISTCLUSTERSKINS CREATECLUSTERSKIN skinName RENAMECLUSTERSKIN skinName INTO newSkinName DELETECLUSTERSKIN skinName';
            item.documentation = 'These commands are available in the Dynamic Cluster only. Use these commands instead of the [LIST|CREATE|RENAME|DELETE]SERVERSKIN[S] commands to work with the cluster-wide Skins.';
            break;
        }
        case 462: {
            item.detail = '(CLI/API) LISTCLUSTERSKINFILES skinName READCLUSTERSKINFILE skinName FILE fileName STORECLUSTERSKINFILE skinName FILE fileName DATA fileContent STORECLUSTERSKINFILE skinName FILE fileName DELETE';
            item.documentation = 'These commands are available in the Dynamic Cluster only. Use these commands instead of the [LIST|READ|STORE]SERVERSKINFILE[S] commands to work with files in the cluster-wide Skins.';
            break;
        }
        case 463: {
            item.detail = '(CLI/API) LISTSTOCKSKINFILES skinName READSTOCKSKINFILE skinName FILE fileName';
            item.documentation = 'Use these commands instead of the [LIST|READ]SERVERSKINFILE[S] commands to work with files in the built-in Skins.';
            break;
        }
        case 464: {
            item.detail = '(CLI/API) CREATEWEBUSERSESSION accountName ADDRESS ip-address [ FOR orig-address ] [ WML | IMode ] [ SKIN skinName ]';
            item.documentation = 'Use this command to create a WebUser session for the specified Account. The command produces an output - a string that contains the WebUser Session ID. This string can be used to compose a URL that will allow the client browser to "enter" the WebUser Session. That URL can have the following format: http://cgateproserver:port/Session/rrrrrrrrrrrr/Mailboxes.wssp where rrrrrrrrrrrr is the Session ID string returned. accountName : string \nThis parameter specifies the Account name.\nip-address : string or IP address\nThis parameter specifies the IP address and port of the client browser. If the Account has the "Fixed IP" Preference setting enabled, connections to the session will be allowed from this IP address only.\norig-address : string\nThis parameter specifies the original IP address of the client browser, if the client connects via a proxy. The ip-address parameter specifies the proxy IP address. If the Account has the "Fixed IP" Preference setting enabled, connections to the session will be allowed from the proxy IP address only and only from this original IP address (passed by the proxy in the X-FORWARDED-FOR HTTP header field).\nskinName : string\nThis optional parameter specifies the Skin to use for the newly created session. The optional WML or IMode keywords can be used to emulate login via a WML or I-Mode browser. The authenticated user should have the All Domains Server access right or the CanCreateWebUserSessions access right to create WebUser Sessions.';
            break;
        }
        case 465: {
            item.detail = '(CLI/API) CREATEXIMSSSESSION accountName ADDRESS ip-address [ FOR orig-address ]';
            item.documentation = 'Use this command to create a XIMSS session for the specified Account. The command produces an output - a string that contains the XIMSS Session ID. This string can be used to compose a URL that will allow the client browser to work with the XIMSS Session using HTTP Binding. accountName : string \nThis parameter specifies the Account name.\nip-address : string \norig-address : string\nThese parameters have the same meaning as for the CREATEWEBUSERSESSION command. The authenticated user should have the All Domains Server access right or the CanCreateWebUserSessions Domain Administration access right to create XIMSS Sessions.';
            break;
        }
        case 466: {
            item.detail = '(CLI/API) FINDACCOUNTSESSION accountName [ ADDRESS ip-address [ FOR proxied-address ] ] [ PROTOCOL protocol ] [ TRANSPORT transport ] [ CLIENT client ]';
            item.documentation = 'Use this command to find an existing session for the specified Account. The command produces an output - a string that contains the Session ID. accountName : string \nThis parameter specifies the Account name.\nip-address : string or IP address\nThis optional parameter specifies the IP address of the client browser. If it is specified, the command will find only those sessions that have the "Fixed IP" Preference disabled or have the same login IP address as the specified one.\nproxied-address : string\nThis optional parameter specifies the IP address of the client browser, if this browser is located behind an HTTP proxy. The ip-address then specifies the IP address of that proxy.\nprotocol : string\nThis optional parameter specifies the Session protocol (WebUser, XIMSS, XMPP, etc.) If specified, only the sessions created with the specified protocol are searched. \ntransport : string\nThis optional parameter specifies the Session transport (HTTP, XIMSS, XMPP, etc.) If specified, only the sessions created with the specified transport are searched. \nclient : string\nThis optional parameter specifies the Session client. If specified, only the sessions created with the specified client (if the client has informed the session about its name) are searched. The authenticated user should have the All Domains Server access right or the CanCreateWebUserSessions Domain Administration access right to use this command.';
            break;
        }
        case 467: {
            item.detail = '(CLI/API) LISTACCOUNTSESSIONS accountName [ ADDRESS ip-address [ FOR proxied-address ] ] [ PROTOCOL protocol ] [ TRANSPORT transport ] [ CLIENT client ]';
            item.documentation = 'Use this command to retrieve all existing sessions for the specified Account. The command produces an output - an array of strings, where each string is the Session ID. \nCommand parameters are the same as the FINDACCOUNTSESSION command parameters. \nThe authenticated user should have the All Domains Server access right or the CanCreateWebUserSessions Domain Administration access right to use this command.';
            break;
        }
        case 468: {
            item.detail = '(CLI/API) GETSESSION sessionID [ DOMAIN domainName ]';
            item.documentation = 'Use this command to retrieve Session data. The command produces an output - a dictionary with the session dataset. sessionID : string \nThis parameter specifies the Session ID.\ndomainName : string\nThis optional parameter specifies the name of Domain the session Account belongs to. The authenticated user should have the All Domains Server access right to retrieve Session data if the domainName parameter is not specified. If the domainName is specified, the authenticated user should have the CanCreateWebUserSessions Domain Administration access right for the specified Domain. This operation resets the session inactivity timer.';
            break;
        }
        case 469: {
            item.detail = '(CLI/API) KILLSESSION sessionID [ DOMAIN domainName ]';
            item.documentation = 'Use this command to terminate a Session. sessionID : string \nThis parameter specifies the Session ID.\ndomainName : string\nThis optional parameter specifies the name of Domain the session Account belongs to. The authenticated user should have the All DomainsServer access right to terminate a Session if the domainName parameter is not specified. If the domainName is specified, the authenticated user should have the CanCreateWebUserSessions Domain Administration access right for the specified Domain.';
            break;
        }
        case 470: {
            item.detail = '(CLI/API) CREATEDOMAINPBX domainName [ FILE language ]';
            item.documentation = 'Use this command to create the Domain Real-Time Application Environment or to create its national subset. domainName : string \nThis parameter specifies the Domain name.\nlanguage : string\nThis optional parameter specifies a national subset name.';
            break;
        }
        case 471: {
            item.detail = '(CLI/API) DELETEDOMAINPBX domainName FILE language';
            item.documentation = 'Use this command to remove a national subset from the Domain Real-Time Application Environment. domainName : string \nThis parameter specifies the Domain name.\nlanguage : string\nThis parameter specifies a national subset name.';
            break;
        }
        case 472: {
            item.detail = '(CLI/API) LISTDOMAINPBXFILES domainName [ FILE language ]';
            item.documentation = 'Use this command to list files in the Domain Real-Time Application Environment. The command produces an output - a dictionary with file names used as keys. The dictionary element values are dictionaries with file attributes. domainName : string \nThis optional parameter specifies the Domain name. If the Domain name is not specified, the command applies to the administrator Domain. \nlanguage : string\nThis optional parameter specifies a national subset name.';
            break;
        }
        case 473: {
            item.detail = '(CLI/API) READDOMAINPBXFILE domainName FILE fileName';
            item.documentation = 'Use this command to read a file from the Domain Real-Time Application Environment. The command produces an output - a datablock with the file contents. domainName : string \nThis parameter specifies the Domain name.\nfileName : string\nThis parameter specifies the file name. To retrieve a file from a national subset, specify the name as language/fileName.';
            break;
        }
        case 474: {
            item.detail = '(CLI/API) STOREDOMAINPBXFILE domainName FILE fileName DATA fileContent STOREDOMAINPBXFILE domainName FILE fileName DELETE';
            item.documentation = 'Use this command to store a file into the Domain Real-Time Application Environment, or to delete a file from the Domain Real-Time Application Environment. domainName : string \nThis parameter specifies the Domain name.\nfileName : string\nThis parameter specifies the file name. To store a file into a national subset, specify the name as language/fileName.\nfileContent : datablock\nThis parameter is specified only if the DATA keyword is used. It should contain the file contents. If the DATA keyword is specified and the environment contains a file with the specified name, the old file is deleted. The file with the specified name is removed from the Environment cache (in the Dynamic Cluster the file is removed from all cluster members caches).';
            break;
        }
        case 475: {
            item.detail = '(CLI/API) CREATESERVERPBX language';
            item.documentation = 'Use this command to create the Server-wide Real-Time Application Environment or to create its national subset. language : string \nThis parameter specifies a national subset name.';
            break;
        }
        case 476: {
            item.detail = '(CLI/API) DELETESERVERPBX language';
            item.documentation = 'Use this command to remove a national subset of the Server-wide Real-Time Application Environment. language : string \nThis parameter specifies a national subset name.';
            break;
        }
        case 477: {
            item.detail = '(CLI/API) LISTSERVERPBXFILES [ language ]';
            item.documentation = 'Use this command to list files in the Server-wide Real-Time Application Environment. The command produces an output - a dictionary with file names used as keys. The dictionary element values are dictionaries with file attributes. language : string \nThis optional parameter specifies a national subset name.';
            break;
        }
        case 478: {
            item.detail = '(CLI/API) READSERVERPBXFILE fileName';
            item.documentation = 'Use this command to read a file from the Server-wide Real-Time Application Environment. The command produces an output - a datablock with the file contents. fileName : string \nThis parameter specifies the file name. To retrieve a file from a national subset, specify the name as language/fileName.';
            break;
        }
        case 479: {
            item.detail = '(CLI/API) STORESERVERPBXFILE fileName DATA fileContent STORESERVERPBXFILE fileName DELETE';
            item.documentation = 'Use this command to store a file into the Server-wide Real-Time Application Environment, or to delete a file from the Server-wide Real-Time Application Environment. fileName : string \nThis parameter specifies the file name. To store a file into a national subset, specify the name as language/fileName.\nfileContent : datablock\nThis parameter is specified only if the DATA keyword is used. It should contain the file contents. If the DATA keyword is specified and the environment contains a file with the specified name, the old file is deleted. The file with the specified name is removed from the Environment cache (in the Dynamic Cluster the file is removed from all cluster members caches).';
            break;
        }
        case 480: {
            item.detail = '(CLI/API) CREATECLUSTERPBX language DELETECLUSTERPBX language LISTCLUSTERPBXFILES [ language ] READCLUSTERPBXFILE fileName STORECLUSTERPBXFILE fileName DATA fileContent STORECLUSTERPBXFILE fileName DELETE';
            item.documentation = 'These commands are available in the Dynamic Cluster only. Use these commands instead of the [LIST|READ|STORE]SERVERPBXFILE[S] commands to work with files in the cluster-wide Real-Time Application Environment.';
            break;
        }
        case 481: {
            item.detail = '(CLI/API) LISTSTOCKPBXFILES [ language ] READSTOCKPBXFILE fileName';
            item.documentation = 'Use these commands instead of the [LIST|READ]SERVERPBXFILE[S] commands to work with files in the stock (built-in) Real-Time Application Environment.';
            break;
        }
        case 482: {
            item.detail = '(CLI/API) STARTPBXTASK accountName PROGRAM programName [ ENTRY entryName ] [ PARAM parameter ]';
            item.documentation = 'Use this command to start a new PBX Task. The command produces an output - a string with the Task ID. accountName : string \nThis parameter specifies the name of an Account. The Task is started on this Account behalf. The name can include the Domain name. If the Domain name is not specified, the current user Domain is used by default. \nprogramName : string\nThe name of the program (the .sppr file) to start.\nentryName : string\nThis optional parameter specifies the program entry point. If this parameter is not specified, the main entry point is used.\nparameter : object\nThis optional parameter specifies the program parameter. The program code can retrieve it using the following code: Vars().startParameter';
            break;
        }
        case 483: {
            item.detail = '(CLI/API) SENDTASKEVENT taskID EVENT eventName [ PARAM parameter ]';
            item.documentation = 'Use this command to send an Event to an existing PBX Task. taskID : string \nThis parameter specifies the Task ID.\neventName : string\nThe name of the Event to send.\nparameter : object\nThis optional parameter specifies the Event parameter.';
            break;
        }
        case 484: {
            item.detail = '(CLI/API) KILLNODE taskID';
            item.documentation = 'Use this command to kill an existing PBX Task. taskID : string \nThis parameter specifies the Task ID.';
            break;
        }
        case 485: {
            item.detail = '(CLI/API) READNODESTATUS taskID';
            item.documentation = 'Use this command to read the current application status of an existing PBX Task. The command produces an output - the application status object. taskID : string \nThis parameter specifies the Task ID.';
            break;
        }
        case 486: {
            item.detail = '(CLI/API) REMOVEACCOUNTSUBSET accountName SUBSET subsetName';
            item.documentation = 'Use this command to remove an Account "dataset" (such as the RepliedAddresses dataset). accountName : string \nThis parameter specifies the name of an existing Account. The asterisk (*) symbol can be used to specify the current authenticated Account. \nsubsetName : string\nThis parameter specifies the name of an existing data subset in the specified Account.';
            break;
        }
        case 487: {
            item.detail = '(CLI/API) DATASET accountName parameters';
            item.documentation = 'Use this command to manage Account "datasets". The command produces an output - a dictionary with the operation results. accountName : string \nThis parameter specifies the name of an existing Account. The asterisk (*) symbol can be used to specify the current authenticated Account. \nparameters : dictionary\nThis dictionary should contain: subsetName \na string element specifying the target dataset or the dataset subset\nwhat - a string element specifying the operation to apply. Other dictionary elements are operation-specific. The following is the list of supported operations (the whatvalues) and the additional parameters dictionary elements used for each operation: \nlistSubsets - this operation lists all subsets of the specified dataset. To list all top-level datasets in the Account, specify the an empty string as the subsetName value. The resulting dictionary contains the found subset names as keys and empty strings as values. \ncreateSet - this operation creates the specified dataset. \nremoveSet - this operation removes the specified dataset. \nlistEntries - this operation lists subset entries. The resulting dictionary contains the found entry names as keys and the entry attribute name-value dictionaries as values. attribute , data - optional string elements; they specify the name and the value of an entry attribute. If specified, the result includes only the entries that have the specified attribute with the specified value. \nUse the "entry" attribute name to filter by entry names. \nmode - an optional string element; if it is absent or its value is "eq" , then the specified attribute should have the specified value; \nif its value is "beg" , then the beginning of the specified attribute value should match the specified value. \nif its value is "end" , then the tail of the specified attribute value should match the specified value. \nif its value is "incl" , then the specified attribute value should include the specified value. \nsetEntry - this operation creates a new entry or updates an existing entry. data - a dictionary with the attribute name-value pairs; they are used to update an existing entry or to create a new one. \nentryName - the entry name string; if the entry with the specified name does not exist, it is created. If this element is absent, a unique entry name is generated.\nifExists - if this element exists, then the new entry cannot be created, and only an existing entry can be updated; if this element is absent and the specified dataset is not found, the dataset is created. \ndeleteEntry - this operation removes the specified entry from the specified dataset. entryName - the entry name string \naddRandomEntry - this operation adds a new entry to the specified dataset or the dataset subset. A unique name is generated and assigned to this entry. If the operation succeeds, the resulting dictionary has the string entryName element with the entry name generated. data - a dictionary with the attribute name-value pairs. It must contain the addressbook.Email attribute.\nentryLimit - an optional numeric value; if specified and positive, then the operation checks the the current number of subset entries does not exceed this limit. If the dataset already contains an entry with the same addressbook.Email attribute value, the dataset is not modified. \nfindAddress - this operation finds an entry with the specified addressbook.Email attribute value. The operation result is a dictionary. If an entry is found, its name is returned as the dictionary element with an empty-string name. address - a string with an E-mail address to look for';
            break;
        }
        case 488: {
            item.detail = '(CLI/API) ROSTER accountName parameters';
            item.documentation = 'Use this command to manage Account Roster. The command produces an output - a dictionary with the operation results. accountName : string \nThis parameter specifies the name of an existing Account. The asterisk (*) symbol can be used to specify the current authenticated Account. \nparameters : dictionary\nThis dictionary should contain the what string element, specifying the operation to apply: List, Update, remove, Presence, probe. Other dictionary elements are operation-specific.';
            break;
        }
        case 489: {
            item.detail = '(CLI/API) BALANCE accountName parameters';
            item.documentation = 'Use this command to manage Account Billing Balances. The command produces an output - a dictionary with the operation results. \naccountName : string \nThis parameter specifies the name of an existing Account. The asterisk (*) symbol can be used to specify the current authenticated Account. \nparameters : dictionary\nThis dictionary should contain the op string element, specifying the operation to apply: list, reserve, release, charge, credit, read, readAll, history, remove. Other dictionary elements are operation-specific.';
            break;
        }
        case 490: {
            item.detail = '(CLI/API) LISTMODULES';
            item.documentation = 'Use this command to list all Server modules. The command produces an output - an array with all module names.';
            break;
        }
        case 491: {
            item.detail = '(CLI/API) GETMODULE moduleName';
            item.documentation = 'Use this command to get the module settings. The command produces an output - a dictionary with the module settings. moduleName : string \nThis parameter specifies the name of a CommuniGate Pro Server module.';
            break;
        }
        case 492: {
            item.detail = '(CLI/API) SETMODULE moduleName newSettings';
            item.documentation = 'Use this command to set the module settings. moduleName : string \nThis parameter specifies the name of a CommuniGate Pro Server module.\nnewSettings : dictionary\nThis dictionary is used to set the module settings dictionary.';
            break;
        }
        case 493: {
            item.detail = '(CLI/API) UPDATEMODULE moduleName newSettings';
            item.documentation = 'Use this command to update the module settings. moduleName : string \nThis parameter specifies the name of a CommuniGate Pro Server module.\nnewSettings : dictionary\nThis dictionary is used to update the module settings dictionary. It does not have to contain all settings data, the omitted settings will be left unmodified.';
            break;
        }
        case 494: {
            item.detail = '(CLI/API) GETQUEUESETTINGS';
            item.documentation = 'Use this command to get the Queue settings. The command produces an output - a dictionary with the Queue settings.';
            break;
        }
        case 495: {
            item.detail = '(CLI/API) SETQUEUESETTINGS newSettings';
            item.documentation = 'Use this command to set the Queue settings. newSettings : dictionary \nThis dictionary is used to set the Queue settings dictionary.';
            break;
        }
        case 496: {
            item.detail = '(CLI/API) GETSIGNALSETTINGS';
            item.documentation = 'Use this command to get the Signal component settings. The command produces an output - a dictionary with the component settings.';
            break;
        }
        case 497: {
            item.detail = '(CLI/API) SETSIGNALSETTINGS newSettings';
            item.documentation = 'Use this command to set the Signal component settings. newSettings : dictionary \nThis dictionary is used to set the component settings dictionary.';
            break;
        }
        case 498: {
            item.detail = '(CLI/API) GETMEDIASERVERSETTINGS';
            item.documentation = 'Use this command to read the Media Server component settings. The command produces an output - a dictionary with the component settings.';
            break;
        }
        case 499: {
            item.detail = '(CLI/API) SETMEDIASERVERSETTINGS newSettings';
            item.documentation = 'Use this command to set the Media Server component settings. newSettings : dictionary \nThis dictionary is used to set the component settings dictionary.';
            break;
        }
        case 500: {
            item.detail = '(CLI/API) GETSESSIONSETTINGS';
            item.documentation = 'Use this command to get the user Sessions settings. The command produces an output - a dictionary with the Sessions settings.';
            break;
        }
        case 501: {
            item.detail = '(CLI/API) SETSESSIONSETTINGS newSettings';
            item.documentation = 'Use this command to set the user Sessions settings. newSettings : dictionary \nThis dictionary is used to set the Sessions settings dictionary.';
            break;
        }
        case 502: {
            item.detail = '(CLI/API) GETCLUSTERSETTINGS';
            item.documentation = 'Use this command to get the Cluster settings. The command produces an output - a dictionary with the Cluster settings.';
            break;
        }
        case 503: {
            item.detail = '(CLI/API) SETCLUSTERSETTINGS newSettings';
            item.documentation = 'Use this command to set the Cluster settings. newSettings : dictionary \nThis dictionary is used to set the Cluster settings dictionary.';
            break;
        }
        case 504: {
            item.detail = '(CLI/API) GETLOGSETTINGS';
            item.documentation = 'Use this command to get the Main Log settings. The command produces an output - a dictionary with the Main Log settings.';
            break;
        }
        case 505: {
            item.detail = '(CLI/API) UPDATELOGSETTINGS newSettings';
            item.documentation = 'Use this command to set the Main Log settings. newSettings : dictionary \nThis dictionary is used to update the Main Log settings dictionary.';
            break;
        }
        case 506: {
            item.detail = '(CLI/API) GETNETWORK';
            item.documentation = 'Use this command to retrieve the Network settings. The command produces an output - a dictionary with the server Network settings.';
            break;
        }
        case 507: {
            item.detail = '(CLI/API) SETNETWORK newSettings';
            item.documentation = 'Use this command to set the server Network Settings. newSettings : dictionary \nNew server Network settings.';
            break;
        }
        case 508: {
            item.detail = '(CLI/API) GETDNRSETTINGS';
            item.documentation = 'Use this command to retrieve the DNR (Domain Name Resolver) settings. The command produces an output - a dictionary with the DNR settings.';
            break;
        }
        case 509: {
            item.detail = '(CLI/API) SETDNRSETTINGS newSettings';
            item.documentation = 'Use this command to set the DNR (Domain Name Resolver) settings. newSettings : dictionary \nNew DNR settings.';
            break;
        }
        case 510: {
            item.detail = '(CLI/API) GETBANNED';
            item.documentation = 'Use this command to retrieve the Banned Message Lines settings. The command produces an output - a dictionary with the server Banned Message Lines settings.';
            break;
        }
        case 511: {
            item.detail = '(CLI/API) SETBANNED newSettings';
            item.documentation = 'Use this command to set the server Banned Message Line Settings. newSettings : dictionary \nNew server Banned settings.';
            break;
        }
        case 512: {
            item.detail = '(CLI/API) GETCLUSTERNETWORK SETCLUSTERNETWORK newSettings';
            item.documentation = 'Use these commands to retrieve and update the Cluster-wide Network settings.';
            break;
        }
        case 513: {
            item.detail = '(CLI/API) GETCLUSTERBANNED SETCLUSTERBANNED newSettings';
            item.documentation = 'Use these commands to retrieve and update the Cluster-wide Banned Message Lines settings.';
            break;
        }
        case 514: {
            item.detail = '(CLI/API) GETSERVERMAILRULES';
            item.documentation = 'Use this command to read the Server-Wide Automated Mail Processing Rules. The command produces an output - an array of the Server Queue Rules.';
            break;
        }
        case 515: {
            item.detail = '(CLI/API) SETSERVERMAILRULES newRules';
            item.documentation = 'Use this command to set the Server-Wide Automated Mail Processing Rules. newRules : array\nAn array of new Server Queue Rules.';
            break;
        }
        case 516: {
            item.detail = '(CLI/API) GETSERVERSIGNALRULES';
            item.documentation = 'Use this command to read the Server-Wide Automated Signal Processing Rules. The command produces an output - an array of the Server Signal Rules.';
            break;
        }
        case 517: {
            item.detail = '(CLI/API) SETSERVERSIGNALRULES newRules';
            item.documentation = 'Use this command to set the Server-Wide Automated Signal Processing Rules. newRules : array\nAn array of new Server Signal Rules.';
            break;
        }
        case 518: {
            item.detail = '(CLI/API) GETCLUSTERMAILRULES SETCLUSTERMAILRULES newRules GETCLUSTERSIGNALRULES SETCLUSTERSIGNALRULES newRules';
            item.documentation = 'Use these commands to retrieve and update the Cluster-wide Rules.';
            break;
        }
        case 519: {
            item.detail = '(CLI/API) GETROUTERTABLE';
            item.documentation = 'Use this command to read the Router Table. The command produces an output - a (multi-line) string with the Router Table text.';
            break;
        }
        case 520: {
            item.detail = '(CLI/API) SETROUTERTABLE newTable';
            item.documentation = 'Use this command to set the Router Table. newTable : string\nA (multi-line) string containing the text of the new Router Table Note: multiple lines should be separated with the \e symbols.';
            break;
        }
        case 521: {
            item.detail = '(CLI/API) GETROUTERSETTINGS';
            item.documentation = 'Use this command to read the Router settings. The command produces an output - a dictionary with the Router settings.';
            break;
        }
        case 522: {
            item.detail = '(CLI/API) SETROUTERSETTINGS newSettings';
            item.documentation = 'Use this command to set the Router settings. newSettings : dictionary\nA dictionary containing new Router settings.';
            break;
        }
        case 523: {
            item.detail = '(CLI/API) GETCLUSTERROUTERTABLE SETCLUSTERROUTERTABLE newTable GETCLUSTERROUTERSETTINGS SETCLUSTERROUTERSETTINGS newSettings';
            item.documentation = 'Use these commands to deal with the Cluster-Wide Router Table and settings.';
            break;
        }
        case 524: {
            item.detail = '(CLI/API) GETSERVERSETTINGS';
            item.documentation = 'Use this command to read the Server "other" settings. The command produces an output - a dictionary with the Server settings.';
            break;
        }
        case 525: {
            item.detail = '(CLI/API) UPDATESERVERSETTINGS newSettings';
            item.documentation = 'Use this command to update the "other" Server settings. newSettings : dictionary \nA dictionary containing new Server settings.';
            break;
        }
        case 526: {
            item.detail = '(CLI/API) REFRESHOSDATA';
            item.documentation = 'Use this command to make the Server re-read the IP data from the server OS: the set of the local IP addresses, and the set of the DNS addresses.';
            break;
        }
        case 527: {
            item.detail = '(CLI/API) GETLANIPS';
            item.documentation = 'Use this command to retrieve the set of LAN IP Addresses. The command produces an output - a (multi-line) string with LAN IP addresses and address ranges.';
            break;
        }
        case 528: {
            item.detail = '(CLI/API) SETLANIPS newAddresses';
            item.documentation = 'Use this command to update the set of LAN IP Addresses. newAddresses : string \nThis (multi-line) string parameter contains the set of addresses and address ranges forming the new set of LAN IP Addresses.';
            break;
        }
        case 529: {
            item.detail = '(CLI/API) GETCLUSTERLANIPS';
            item.documentation = 'Use this command to retrieve the set of Cluster-wide LAN IP Addresses. The command produces an output - a (multi-line) string with Cluster-wide LAN IP addresses and address ranges.';
            break;
        }
        case 530: {
            item.detail = '(CLI/API) SETCLUSTERLANIPS newAddresses';
            item.documentation = 'Use this command to update the set of Cluster-wide LAN IP Addresses. newAddresses : string \nThis (multi-line) string parameter contains the set of addresses and address ranges forming the new set of Cluster-wide LAN IP Addresses.';
            break;
        }
        case 531: {
            item.detail = '(CLI/API) GETCLIENTIPS SETCLIENTIPS newAddresses GETCLUSTERCLIENTIPS SETCLUSTERCLIENTIPS newAddresses';
            item.documentation = 'Use these commands to retrieve and set Server-wide and Cluster-wide Client IP Addresses.';
            break;
        }
        case 532: {
            item.detail = '(CLI/API) GETBLACKLISTEDIPS SETBLACKLISTEDIPS newAddresses GETCLUSTERBLACKLISTEDIPS SETCLUSTERBLACKLISTEDIPS newAddresses';
            item.documentation = 'Use these commands to retrieve and set Server-wide and Cluster-wide Blacklisted IP Addresses.';
            break;
        }
        case 533: {
            item.detail = '(CLI/API) GETWHITEHOLEIPS SETWHITEHOLEIPS newAddresses GETCLUSTERWHITEHOLEIPS SETCLUSTERWHITEHOLEIPS newAddresses';
            item.documentation = 'Use these commands to retrieve and set Server-wide and Cluster-wide WhiteHole IP Addresses.';
            break;
        }
        case 534: {
            item.detail = '(CLI/API) GETNATEDIPS SETNATEDIPS newAddresses GETCLUSTERNATEDIPS SETCLUSTERNATEDIPS newAddresses';
            item.documentation = 'Use these commands to retrieve and set Server-wide and Cluster-wide NATed IP Addresses.';
            break;
        }
        case 535: {
            item.detail = '(CLI/API) GETNATSITEIPS SETNATSITEIPS newAddresses GETCLUSTERNATSITEIPS SETCLUSTERNATSITEIPS newAddresses';
            item.documentation = 'Use these commands to retrieve and set Server-wide and Cluster-wide NAT Site IP Addresses.';
            break;
        }
        case 536: {
            item.detail = '(CLI/API) GETDEBUGIPS SETDEBUGIPS newAddresses GETCLUSTERDEBUGIPS SETCLUSTERDEBUGIPS newAddresses';
            item.documentation = 'Use these commands to retrieve and set Server-wide and Cluster-wide Debug IP Addresses.';
            break;
        }
        case 537: {
            item.detail = '(CLI/API) GETDENIEDIPS SETDENIEDIPS newAddresses GETCLUSTERDENIEDIPS SETCLUSTERDENIEDIPS newAddresses';
            item.documentation = 'Use these commands to retrieve and set Server-wide and Cluster-wide Denied IP Addresses.';
            break;
        }
        case 538: {
            item.detail = '(CLI/API) ROUTE address [ mail | access | signal ]';
            item.documentation = 'Use this command to get the routing for the specified address. address : string \nThis parameter specifies the E-mail address to be processed with the CommuniGate Pro Router. \nmail or access or signal - This optional flag specifies the Routing type. The default mode is access. This command produces an output - an array of three strings: \nmodule - the name of the CommuniGate Pro module the address is routed to, or SYSTEMif the address is routed to a built-in destination (like NULL). \nhost - the object/queue handled by the specified module: an Internet domain name for the SMTP module, a local Account name for the Local Delivery module, etc. \naddress - the address inside the queue (E-mail address for SMTP, Real-To: address for Local Delivery, etc.)';
            break;
        }
        case 539: {
            item.detail = '(CLI/API) GETIPSTATE ip-address [ TEMP ]';
            item.documentation = 'Use this command to get the type assigned to the specified address. The command produces an output - a string with the IP address type. \nIf the TEMP keyword is specified, the temporary Client IP Addresses set is checked. ip-address : string or IP address \nThis parameter specifies the IP Address to check.';
            break;
        }
        case 540: {
            item.detail = '(CLI/API) GETSERVERINTERCEPT';
            item.documentation = 'Use this command to read the Lawful Intercept settings. The command produces an output - a dictionary with the Intercept settings.';
            break;
        }
        case 541: {
            item.detail = '(CLI/API) SETSERVERINTERCEPT newSettings';
            item.documentation = 'Use this command to set the Lawful Intercept settings. newSettings : dictionary \nA dictionary containing new Intercept settings.';
            break;
        }
        case 542: {
            item.detail = '(CLI/API) GETCLUSTERINTERCEPT SETCLUSTERINTERCEPT newSettings';
            item.documentation = 'These commands are the same as the GETSERVERINTERCEPT and SETSERVERINTERCEPT commands, but they deal with the Cluster-Wide Lawful Intercept settings.';
            break;
        }
        case 543: {
            item.detail = '(CLI/API) GETSTATELEMENT ObjectID';
            item.documentation = 'Use this command to retrieve the current value of a Server statistics (SNMP) element. ObjectID : string \nThe object ID of the Server statistics element. This command produces an output - a number, string, or other object with the Server statistics element value.';
            break;
        }
        case 544: {
            item.detail = '(CLI/API) SETSTATELEMENT ObjectID [ INC | SET ] setValue';
            item.documentation = 'Use this command to update the current value of a Server statistics (SNMP) element. Only the "Custom" elements can be updated. ObjectID : string \nThe object ID of the Server statistics element. \nsetValue : numeric string\nif the INC keyword is used, this value is added to the Element value, if the SET keyword is used, this value is assigned to the Element.';
            break;
        }
        case 545: {
            item.detail = '(CLI/API) GETNEXTSTATNAME ObjectID';
            item.documentation = 'Use this command to enumerate available Server statistics (SNMP) elements. ObjectID : string \nAn empty string or the object ID of the already found Server statistics element. This command produces an output - a string with the ObjectID of the next statistics element. \nIf the ObjectID parameter is an empty string, the ObjectID of the first available Server statistics element is returned. \nIf a statistics element for the specified ObjectID is not found, or if the found element is the last available one, the command returns an error.';
            break;
        }
        case 546: {
            item.detail = '(CLI/API) GETDIALOGINFO DialogID';
            item.documentation = 'Use this command to retrieve the information about a Signal Dialog object. DialogID : number \nThe Dialog ID. This command produces an output - a dictionary with the Dialog status data.';
            break;
        }
        case 547: {
            item.detail = '(CLI/API) SHUTDOWN';
            item.documentation = 'Use this command to stop the CommuniGate Pro Server.';
            break;
        }
        case 548: {
            item.detail = '(CLI/API) GETACCOUNTSTAT accountName [ KEY keyName ]';
            item.documentation = 'Use this command to retrieve statistics data about the specified Account. accountName : string \nThis parameter specifies the name of an existing Account. The asterisk (*) symbol can be used to specify the current authenticated Account. \nkeyName : string\nThis optional parameter specifies the name of the statistical entry to retrieve. This command produces an output - a number or a timeStamp with the specified statistical information, or (if the KEY keyword and the keyName parameter are not specified) a dictionary with all available statistical data. If the statistical data for the specified key does not exist, an empty string is returned. To use this command, the user should have the Domain Administration right for the target Account Domain. All users can retrieve the Account statistics data for their own accounts.';
            break;
        }
        case 549: {
            item.detail = '(CLI/API) RESETACCOUNTSTAT accountName [ KEY keyName ]';
            item.documentation = 'Use this command to reset statistics data about the specified Account. accountName : string \nThis parameter specifies the name of an existing Account. The asterisk (*) symbol can be used to specify the current authenticated Account. \nkeyName : string\nThis optional parameter specifies the name of the statistical entry to reset. If the KEY keyword and the keyName parameter are not specified, all Account statistical entries are reset. To use this command, the user should have the "Basic Settings" Domain Administration right for the target Account Domain. \nThe following Account statistics data keys are implemented: \nStatReset - The date & time when the last parameterless RESETACCOUNTSTAT command was sent to this Account \nMessagesReceived - The total number of messages delivered to the Account \nBytesReceived - The total size of all messages delivered to the Account \nMessagesSent - The total number of messages sent on the Account behalf \nBytesSent - The total size of all messages sent on the Account behalf \nCallsReceived - The total number of calls received for the Account \nCallsSent - The total number of calls placed on the Account behalf \nLogins - The total number of successful Account authentications';
            break;
        }
        case 550: {
            item.detail = '(CLI/API) GETDOMAINSTAT domainName [ KEY keyName ]';
            item.documentation = 'Use this command to retrieve statistics data about the specified Domain. domainName : string \nThis parameter specifies the name of an existing Domain. The asterisk (*) symbol can be used to specify the Domain of the current authenticated Account. \nkeyName : string\nThis optional parameter specifies the name of the statistical entry to retrieve. This command produces an output - a string with the specified statistical information, or (if the KEYkeyword and the keyName parameter are not specified) a dictionary with all available statistical data. To use this command, the user should have the Domain Administration right for the target Domain.';
            break;
        }
        case 551: {
            item.detail = '(CLI/API) RESETDOMAINSTAT domainName [ KEY keyName ]';
            item.documentation = 'Use this command to reset statistics data about the specified Domain. domainName : string \nThis parameter specifies the name of an existing Domain. The asterisk (*) symbol can be used to specify the Domain of the current authenticated Account. \nkeyName : string\nThis optional parameter specifies the name of the statistical entry to reset. If the KEY keyword and the keyName parameter are not specified, all Domain statistical entries are reset. To use this command, the user should have the "Basic Settings" Domain Administration right for the target Domain. \nThe following Domain statistics data keys are implemented: \nStatReset - The date and time when the last parameterless RESETDOMAINSTAT command was sent to this Domains \nMessagesReceived - The total number of messages delivered to the Domain Accounts \nBytesReceived - The total size of all messages delivered to the Domain Accounts \nMessagesSent - The total number of messages sent on the Domain Accounts behalf \nBytesSent - The total size of all messages sent on the Domain Accounts behalf \nCallsReceived - The total number of calls received by the Domain Accounts \nCallsSent - The total number of calls placed on the Domain Accounts behalf';
            break;
        }
        case 552: {
            item.detail = '(CLI/API) LISTDIRECTORYUNITS [ SHARED ]';
            item.documentation = 'Use this command to retrieve the list of all Directory units created. If the SHARED keyword is used, the cluster-wide Units are listed. \nThis command produces an output - a dictionary, where the keys are Directory Unit mount points, and the values are Directory Unit names.';
            break;
        }
        case 553: {
            item.detail = '(CLI/API) CREATEDIRECTORYUNIT unitName [ SHARED ] [ REMOTE ] mountPoint';
            item.documentation = 'Use this command to create a new Directory Unit. unitName : string \nThis parameter specifies the new Unit name. \nmountPoint : string\nThis parameter specifies the new Unit mount point (mount DN). If the SHARED keyword is used, a cluster-wide Directory Unit is created. \nIf the REMOTE keyword is used, a Remote (LDAP-based) Directory Unit is created, otherwise a Local (File-based) Directory Unit is created.';
            break;
        }
        case 554: {
            item.detail = '(CLI/API) RELOCATEDIRECTORYUNIT unitName [ SHARED ] newMountPoint';
            item.documentation = 'Use this command to re-mount an existing Directory Unit on a different mount point. unitName : string \nThis parameter specifies the Directory Unit name. If the SHARED keyword is used, this is a cluster-wide Directory Unit name. \nmountPoint : string\nThis parameter specifies the new mount point (mount DN).';
            break;
        }
        case 555: {
            item.detail = '(CLI/API) DELETEDIRECTORYUNIT unitName [ SHARED ]';
            item.documentation = 'Use this command to remove an existing Directory Unit. unitName : string \nThis parameter specifies the Directory Unit name. If the SHARED keyword is used, this is a cluster-wide Directory Unit name.';
            break;
        }
        case 556: {
            item.detail = '(CLI/API) GETDIRECTORYUNIT unitName [ SHARED ]';
            item.documentation = 'Use this command to retrieve the Directory Unit settings. unitName : string \nThis parameter specifies the Directory Unit name. If the SHARED keyword is used, this is a cluster-wide Directory Unit name. This command produces an output - a dictionary with the Directory Unit settings.';
            break;
        }
        case 557: {
            item.detail = '(CLI/API) SETDIRECTORYUNIT unitName [ SHARED ] newSettings';
            item.documentation = 'Use this command to change the Directory Unit settings. unitName : string \nThis parameter specifies the Directory Unit name. If the SHARED keyword is used, this is a cluster-wide Directory Unit name.\nnewSettings : dictionary\nThis parameter specifies the new Directory Unit settings.';
            break;
        }
        case 558: {
            item.detail = '(CLI/API) GETDIRECTORYACCESSRIGHTS [ SHARED ]';
            item.documentation = 'Use this command to retrieve the Directory Access Rights. If the SHARED keyword is used, the cluster-wide Access Rights are retrieved. \nThis command produces an output - an array of Access Rights elements.';
            break;
        }
        case 559: {
            item.detail = '(CLI/API) SETDIRECTORYACCESSRIGHTS [ SHARED ] newAccessRights';
            item.documentation = 'Use this command to set the Directory Access Rights. If the SHARED keyword is used, the cluster-wide Access Rights are set. newAccessRights : array \nThis parameter specifies the new Directory Access Rights.';
            break;
        }
        case 560: {
            item.detail = '(CLI/API) LISTCLICOMMANDS';
            item.documentation = 'Use this command to retrieve the list of all CLI commands supported by this version of CommuniGate Pro Server. This command produces an output - an array of strings, where each string is a supported command name.';
            break;
        }
        case 561: {
            item.detail = '(CLI/API) NOOP';
            item.documentation = 'This command always completes successfully.';
            break;
        }
        case 562: {
            item.detail = '(CLI/API) ECHO object';
            item.documentation = 'This command produces an output - an object, which is the command parameter copy.';
            break;
        }
        case 563: {
            item.detail = '(CLI/API) GETVERSION';
            item.documentation = 'This command produces an output - a string with this CommuniGate Pro Server version.';
            break;
        }
        case 564: {
            item.detail = '(CLI/API) GETSYSTEMINFO what';
            item.documentation = 'This command produces an output - an object returned by the CG/PL SystemInfo function called with the what parameter. \nIf that function returns a null-object, this command returns an error.';
            break;
        }
        case 565: {
            item.detail = '(CLI/API) GETCURRENTTIME';
            item.documentation = 'This command produces an output - a timestamp with this CommuniGate Pro Server internal timer value.';
            break;
        }
        case 566: {
            item.detail = '(CLI/API) SETLOGALL [ ON | OFF ]';
            item.documentation = 'Use this command to switch on and off the "Log Everything" mode (this mode can also be enabled by using the --LogAll command line option. To use this command, the user should have the "Can Monitor" Server Administration right.';
            break;
        }
        case 567: {
            item.detail = '(CLI/API) DUMPALLOBJECTS';
            item.documentation = 'Use this command to write the list of all application data objects into the OS syslog. \nNote: this list may contain millions of objects, and this command can easily overload the OS syslog facilities. It also blocks object creation and releasing functionality, effectively suspending CommuniGate Pro Server activities till all objects are listed. To use this command, the user should have the "Can Monitor" Server Administration right.';
            break;
        }
        case 568: {
            item.detail = '(CLI/API) TESTLOOP seconds';
            item.documentation = 'Use this command to test the server CPU load. The command executes some calculation loop for the specified number of seconds. This command produces an output - a number that indicates the average CLI thread CPU performance (the number of times the test loop was executed divided by the test time). To use this command, the user should have the "Can Monitor" Server Administration right.';
            break;
        }
        case 569: {
            item.detail = '(CLI/API) SETTRACE facility [ ON | OFF ]';
            item.documentation = 'Use this command to switch on and off internal logging facitilies that write to OS syslog. The facility parameter should be a string with one of the folloing supported values: \nFileIO - record all file read/write/truncate operations \nFileOp - record all file create/rename/remove operations To use this command, the user should have the "Can Monitor" Server Administration right.';
            break;
        }
        case 570: {
            item.detail = '(CLI/API) WRITELOG logLevel logRecord';
            item.documentation = 'Use this command to store a record into the Server Log. logLevel : number \nThis parameter specifies the record log level.\nlogRecord : string\nThis parameter specifies the string to be placed into the Server Log. Log records generated with this command have the SYSTEM prefix. To use this command, the user should have the "Can Monitor" Server Administration right.';
            break;
        }
        case 571: {
            item.detail = '(CLI/API) RELEASESMTPQUEUE queueName';
            item.documentation = 'Use this command to release an SMTP queue. queueName : string \nThis parameter specifies the queue (domain) name to release. In a Dynamic Cluster environment this command releases the specified SMTP queue on all servers. To use this command, the user should have the "Can Monitor" Server Administration right.';
            break;
        }
        case 572: {
            item.detail = '(CLI/API) REJECTQUEUEMESSAGE messageID [ REPORT errorText ]';
            item.documentation = 'Use this command to reject a message from the Server Queue. messageID : number \nThis parameter specifies the message ID. \nerrorText : string\nThis optional parameter specifies the text to be included into the error report (bounce) sent to the message sender. If this parameter is NONDN, no DSN report message is generated. To use this command, the user should have the "Can Reject Queues" Server Administration right.';
            break;
        }
        case 573: {
            item.detail = '(CLI/API) REJECTQUEUEMESSAGES SENDER authedSender [ REPORT errorText ]';
            item.documentation = 'Use this command to reject all messages sent by the specified sender from the Server Queue. authedSender : string \nThis parameter specifies the authenticated sender"s name.\nerrorText : string\nThis optional parameter specifies the text to be included into the error report (bounce) sent to the message sender. If this parameter is NONDN, no DSN report message is generated. In a Dynamic Cluster environment this command rejects messages from all server queues. \nTo use this command, the user should have the "Can Reject Queues" Server Administration right.';
            break;
        }
        case 574: {
            item.detail = '(CLI/API) GETMESSAGEQUEUEINFO moduleName QUEUE queueName';
            item.documentation = 'Use this command to read information about a module message Queue. moduleName : string \nThis parameter specifies the module name. \nqueueName : string\nThis parameter specifies the module queue name. This command produces an output - a dictionary with the specified queue information. \nIf the module does not have the specified queue, the dictionary is empty. Otherwise it contains the following elements: \nnTotal - a number - the total number of messages in the queue \nsize - a number - the total size of all messages in the queue \ndelayedTill - (optional) a timestamp - the effective release time for this queue \nlastError - (optional) a string with the last problem report';
            break;
        }
        case 575: {
            item.detail = '(CLI/API) GETCURRENTCONTROLLER';
            item.documentation = 'Use this command to get the IP address of the current Dynamic Cluster Controller. \nThis command produces an output - a string with the Cluster Controller IP Address. To use this command, the user should have the "Can Monitor" Server Administration right.';
            break;
        }
        case 576: {
            item.detail = '(CLI/API) RECONNECTCLUSTERADMIN';
            item.documentation = 'Use this command to force a Dynamic Cluster member to re-open all its inter-cluster Administrative connections, and (for a non-controller member) to re-open its Administrative connection to the Controller.';
            break;
        }
        case 577: {
            item.detail = '(CLI/API) GETTEMPCLIENTIPS';
            item.documentation = 'Use this command to retrieve the set of temporary Client IP Addresses. The command produces an output - a string with Temporary Client IP addresses separated with the comma (,) symbols. To use this command, the user should have the "Can Monitor" Server Administration right.';
            break;
        }
        case 578: {
            item.detail = '(CLI/API) TEMPBLACKLISTIP address [ TIMEOUT seconds | DELETE ]';
            item.documentation = 'Use this command to add an address to the Temporary Blacklisted IP Addresses set. address : string \nThe Network IP Address to add. \nseconds : number\nThe time period the address should be blacklisted for. Use the DELETE keyword or specify zero time period to remove the address from the Temporary Blacklisted IP Addresses set.';
            break;
        }
        case 579: {
            item.detail = '(CLI/API) GETTEMPBLACKLISTEDIPS';
            item.documentation = 'Use this command to retrieve the set of Temporary Blacklisted IP Addresses. The command produces an output - a string with Temporary Blacklisted IP addresses separated with the comma ( ,) symbols. Each IP address may have a -nnnn suffix, where nnnn is either the number of seconds this address will remain blacklisted for, or the * symbol indicating permanent address blacklisting. To use this command, the user should have the "Can Monitor" Server Administration right.';
            break;
        }
        case 580: {
            item.detail = '(CLI/API) SETTEMPBLACKLISTEDIPS addresses';
            item.documentation = 'Use this command to add addresses to the Temporary Blacklisted IP Addresses list. addresses : string \nA string with a list of IP addresses, using the output format of the GetTempBlacklistedIPs command. To use this command, the user should have the "Server Settings" Server Administration right.';
            break;
        }
    }
    /*
    if (item.data === 1) {
        item.detail = 'Built-in Function',
        item.documentation = 'Same(arg1,arg2) This function returns a true-value if the values of arg1 and arg2 are the same object or if both values are null-values or both values are true-values. In other cases the function returns a null-value.'
    } else if (item.data === 2) {
        item.detail = 'Built-in Function',
        item.documentation = 'Copy(arg) If the arg value is a null-value, this function returns a null-value. Otherwise, the function returns the copy of the arg value. For complex objects (such as arrays, dictionaries, XML objects), this function copies all complex object elements, too.'
    } */
    return item;
});
let t;
/*
connection.onDidOpenTextDocument((params) => {
    // A text document got opened in VSCode.
    // params.textDocument.uri uniquely identifies the document. For documents store on disk this is a file URI.
    // params.textDocument.text the initial full content of the document.
    connection.console.log(`${params.textDocument.uri} opened.`);
});

connection.onDidChangeTextDocument((params) => {
    // The content of a text document did change in VSCode.
    // params.textDocument.uri uniquely identifies the document.
    // params.contentChanges describe the content changes to the document.
    connection.console.log(`${params.textDocument.uri} changed: ${JSON.stringify(params.contentChanges)}`);
});

connection.onDidCloseTextDocument((params) => {
    // A text document got closed in VSCode.
    // params.textDocument.uri uniquely identifies the document.
    connection.console.log(`${params.textDocument.uri} closed.`);
});
*/
// Listen on the connection
connection.listen();
//# sourceMappingURL=server.js.map