# Set compressor
SetCompressor /SOLID lzma

Name "VPPRV1"
OutFile "VPPRV1-Setup.exe"
InstallDir "$PROGRAMFILES64\VPPRV1"

Section "MainSection" SEC01
  SetOutPath "$INSTDIR"
  SetOverwrite ifnewer
  File /r "clients\windows\publish-out\*.*"
  
  CreateDirectory "$SMPROGRAMS\VPPRV1"
  CreateShortCut "$SMPROGRAMS\VPPRV1\VPPRV1.lnk" "$INSTDIR\VPPRV1.exe"
  CreateShortCut "$DESKTOP\VPPRV1.lnk" "$INSTDIR\VPPRV1.exe"
  
  WriteUninstaller "$INSTDIR\uninst.exe"
SectionEnd

Section "Uninstall"
  Delete "$INSTDIR\uninst.exe"
  Delete "$SMPROGRAMS\VPPRV1\VPPRV1.lnk"
  Delete "$DESKTOP\VPPRV1.lnk"
  RMDir "$SMPROGRAMS\VPPRV1"
  RMDir /r "$INSTDIR"
SectionEnd
