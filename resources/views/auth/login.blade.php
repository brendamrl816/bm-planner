@extends('master')
@section('name', 'Login')

@section('content')

    <form method="post">
        @foreach ($errors->all() as $error)
            <p>{{ $error}}</p>
        @endforeach
        
        {!! csrf_field() !!}
        
        Email: <input type="text" id="email" name="email" value="{{ old('email') }}"><br>
        Password: <input type="password" name="password"><br>
        
        <input type="checkbox" name="remember">Remember Me?
        
        <button type="submit">Login</button>
    </form>

@endsection