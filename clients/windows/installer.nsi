; VPPRV1 NSIS Windows Installer Script (Xray Core)
Unicode true
!define PRODUCT_NAME "VPPRV1"
!define PRODUCT_VERSION "1.0.0"
!define PRODUCT_PUBLISHER "VPPRV1 Platform"
!define PRODUCT_WEB_SITE "https://vpprv1.workers.dev"
!define PRODUCT_DIR_REGKEY "Software\Microsoft\Windows\CurrentVersion\App Paths\VPPRV1.exe"
!define PRODUCT_UNINST_KEY "Software\Microsoft\Windows\CurrentVersion\Uninstall\${PRODUCT_NAME}"
!define PRODUCT_UNINST_ROOT_KEY "HKLM"

SetCompressor /SOLID lzma

Name "${PRODUCT_NAME} ${PRODUCT_VERSION}"
OutFile "VPPRV1-Setup.exe"
InstallDir "$PROGRAMFILES64\VPPRV1"
InstallDirRegKey HKLM "${PRODUCT_DIR_REGKEY}" ""
ShowInstDetails show
ShowUnInstDetails show

Section "MainSection" SEC01
  SetOutPath "$INSTDIR"
  SetOverwrite ifnewer
  File /r "${PUBLISH_DIR}\*.*"
  
  CreateDirectory "$SMPROGRAMS\VPPRV1"
  CreateShortCut "$SMPROGRAMS\VPPRV1\VPPRV1.lnk" "$INSTDIR\VPPRV1.exe"
  CreateShortCut "$DESKTOP\VPPRV1.lnk" "$INSTDIR\VPPRV1.exe"
SectionEnd

Section -Post
  WriteUninstaller "$INSTDIR\uninst.exe"
  WriteRegStr HKLM "${PRODUCT_DIR_REGKEY}" "" "$INSTDIR\VPPRV1.exe"
  WriteRegStr ${PRODUCT_UNINST_ROOT_KEY} "${PRODUCT_UNINST_KEY}" "DisplayName" "$(^Name)"
  WriteRegStr ${PRODUCT_UNINST_ROOT_KEY} "${PRODUCT_UNINST_KEY}" "UninstallString" "$INSTDIR\uninst.exe"
  WriteRegStr ${PRODUCT_UNINST_ROOT_KEY} "${PRODUCT_UNINST_KEY}" "DisplayVersion" "${PRODUCT_VERSION}"
  WriteRegStr ${PRODUCT_UNINST_ROOT_KEY} "${PRODUCT_UNINST_KEY}" "URLInfoAbout" "${PRODUCT_WEB_SITE}"
  WriteRegStr ${PRODUCT_UNINST_ROOT_KEY} "${PRODUCT_UNINST_KEY}" "Publisher" "${PRODUCT_PUBLISHER}"
SectionEnd

Function un.onUninstSuccess
  HideWindow
  MessageBox MB_ICONINFORMATION|MB_OK "نرم‌افزار با موفقیت حذف گردید."
FunctionEnd

Function un.onInit
  MessageBox MB_ICONQUESTION|MB_YESNO|MB_DEFBUTTON2 "آیا مایل به حذف کامل نرم‌افزار هستید؟" IDYES +2
  Abort
FunctionEnd

Section Uninstall
  Delete "$INSTDIR\uninst.exe"
  Delete "$SMPROGRAMS\VPPRV1\VPPRV1.lnk"
  Delete "$DESKTOP\VPPRV1.lnk"
  RMDir "$SMPROGRAMS\VPPRV1"
  RMDir /r "$INSTDIR"

  DeleteRegKey ${PRODUCT_UNINST_ROOT_KEY} "${PRODUCT_UNINST_KEY}"
  DeleteRegKey HKLM "${PRODUCT_DIR_REGKEY}"
  SetAutoClose true
SectionEnd
