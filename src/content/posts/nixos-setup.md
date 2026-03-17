---
title: "NixOSで再現可能な開発環境を作る"
date: 2026-03-16
description: "NixOSとHome Managerを使った開発環境構築のメモ。flakeベースの設定管理。"
tags: ["nixos", "linux"]
---

## NixOSとは

NixOSは、Nixパッケージマネージャーをベースにした関数型Linuxディストリビューション。

特徴：
- **宣言的設定** - 全システムを一つの設定ファイルで定義
- **再現可能** - 同じ設定 = 同じ環境
- **ロールバック可能** - 壊れても前の世代に戻せる

## Flakeベースの設定

```nix
{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    home-manager.url = "github:nix-community/home-manager";
  };
  
  outputs = { self, nixpkgs, home-manager }: {
    nixosConfigurations.hostname = nixpkgs.lib.nixosSystem {
      system = "x86_64-linux";
      modules = [
        ./configuration.nix
        home-manager.nixosModules.home-manager
      ];
    };
  };
}
```

詳しくはGitHubリポジトリ [mtdnot/nixos-flake](https://github.com/mtdnot/nixos-flake) を参照。
