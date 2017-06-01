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
            //hoverProvider: true,
            //documentHighlightProvider: true,
            // Tell the client that the server works in FULL text document sync mode
            textDocumentSync: documents.syncKind,
            // Tell the client that the server support code complete
            completionProvider: {
                resolveProvider: true
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
/*
connection.onHover((textDocumentPosition: TextDocumentPositionParams): Hover => {
    //console.log(textDocumentPosition.position.character, textDocumentPosition.position.line);
    //console.log(textDocumentPosition.textDocument);
    //console.log(documents.get(textDocumentPosition.textDocument.uri).lineCount);
    //console.log();
    let lines = documents.get(textDocumentPosition.textDocument.uri).getText().split(/\r?\n/g);
    let line = lines[textDocumentPosition.position.line];
    return {
        contents: line
    }

});
*/
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
        { label: 'SessionData', kind: vscode_languageserver_1.CompletionItemKind.Function, data: 268 }
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