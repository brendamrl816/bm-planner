@extends('shared.master')
@section('title', 'All roles')
@section('content')

   <div class="secondCover">
        <div class="secondBody">
            
            <div class="barDiv">
                <div style="display:inline-block; height:100%; vertical-align:middle"></div>
                
                <a class="barDiv-logo" style="text-decoration:none; color:white" href="/">
                  <div style="font-size:150%; font-weight:bold; text-shadow: 1px 1px 1px #000000">gmPlanner</div>
                </a>
                
                <div style="display:inline-block">
                    <a class="adminLink" href="/admin">
                        <span>Admin Home</span>
                    </a>
                </div>
                
                <div style="display:inline-block; margin-left:10px">
                    <a class="adminLink" href="/admin/roles/create">
                        <span>Create Role</span>
                    </a>
                </div>
            </div>
            
            <div class="secondBodyDiv">
                
                <h2>ALL Roles</h2>
            
                 @if (session('status'))
                    <div>
                        {{session('status') }}
                    </div>
                @endif
                
                @if ($roles->isEmpty())
                    <p> There is no role.</p>
                @else
                
                <div class="tableDiv">
                    <table class="adminTable">
                        <tr class="adminTr">
                            <th class="adminTdR">Name</th>
                            <th class="adminTdR">Display Name</th>
                            <th class="adminTdR">Description</th>
                        </tr>
                        <tbody>
                        @foreach($roles as $role)
                            <tr class="adminTr">
                                <td class="adminTd"><div class="adminTd-inside">{!! $role->name !!}</div></td>
                                <td class="adminTd"><div class="adminTd-inside">{!! $role->display_name !!}</div></td>
                                <td class="adminTd"><div class="adminTd-inside">{!! $role->description !!}</div></td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
                    
                 @endif 
        
            </div>
        </div>
   </div>
   
@endsection